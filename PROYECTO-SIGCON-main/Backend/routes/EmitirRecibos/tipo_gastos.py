from flask import Blueprint, jsonify
from services.get.getTipoGastos import getTipoGastos
from schemas.tipo_gastos_schema import TipoGastosSchema

tipo_gastos = Blueprint('tipo_gastos', __name__)

@tipo_gastos.route('/getTipoGastosComunes')
def tipoGastosComunes():
    try:
        tipoGastos = getTipoGastos()
        if(len(tipoGastos) > 0):
            tipo_gastos_serialized=TipoGastosSchema().dump(tipoGastos, many=True)
            return jsonify({'tipoGastosComunes':tipo_gastos_serialized, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})