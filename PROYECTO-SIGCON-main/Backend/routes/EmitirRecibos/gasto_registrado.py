from flask import Blueprint, jsonify
from services.get.getGastoRegistrado import getGastosPredioI

gasto_registrado = Blueprint('gasto_registrado', __name__)

@gasto_registrado.route('/getGastosPredios/<int:id>/<int:idgasto>')
def gastosPrediosI(id, idgasto):
    try:
        gastosPredios = getGastosPredioI(id, idgasto)
        if(len(gastosPredios) > 0):
            return jsonify({'gastoPredioDetalleI':gastosPredios, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})