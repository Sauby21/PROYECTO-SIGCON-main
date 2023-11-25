from flask import Blueprint, jsonify
from services.get.getPredios import getPredios
from schemas.predios_schema import PrediosSchema

predios = Blueprint('predios', __name__)

@predios.route('/getPredios')
def Predios():
    try:
        capturar_predios = getPredios()
        if(len(capturar_predios) > 0):
            predios_serialized=PrediosSchema().dump(capturar_predios, many=True)
            return jsonify({'predios':predios_serialized, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})
