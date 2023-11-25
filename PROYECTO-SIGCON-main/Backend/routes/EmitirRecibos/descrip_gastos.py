from flask import Blueprint, jsonify
from services.get.getDescripGastos import getDescripGastos
from schemas.descrip_gastos_schema import DescripGastosSchema

descrip_gastos = Blueprint('descrip_gastos', __name__)

@descrip_gastos.route('/getTipoGastosComunes/<int:id>')
def descripGastos(id):
    try:
        tipoGastos = getDescripGastos(id)
        if(len(tipoGastos) > 0):
            tipoGastos_serialized=DescripGastosSchema().dump(tipoGastos, many=True)
            return jsonify({'descripGastosComunes':tipoGastos_serialized, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})