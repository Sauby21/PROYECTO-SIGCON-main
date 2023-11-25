from flask import Blueprint, jsonify
from services.get.getGastos import getGastos
from schemas.gastos_schema import GastosSchema

gastos = Blueprint('gastos', __name__)

@gastos.route('/getPredios/<int:id>')
def Gastos(id):
    try:
        capturar_gastos = getGastos(id)
        if(len(capturar_gastos)>0):
            gastos_serialized=GastosSchema().dump(capturar_gastos, many=True)
            return jsonify({'gastos':gastos_serialized, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})