from flask import Blueprint, jsonify
from services.get.getTablaCasas import getTablaCasas
from schemas.casas_schema import CasasSchema

tabla_casas = Blueprint('tabla_casas', __name__)

@tabla_casas.route('/getPredios/<int:id>/getCasas')
def casas(id):
    try:
        casas = getTablaCasas(id)
        if(len(casas)>0):
            casas_serialized  = CasasSchema().dump(casas, many=True)
            return jsonify({'casas':casas_serialized, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})
