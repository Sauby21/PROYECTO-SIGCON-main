from flask import Blueprint, jsonify
from services.get.getPredio import getPredio

predio = Blueprint('predio', __name__)

@predio.route('/getPredio/<int:id>')
def Predio(id):
    try:
        capturar_predio = getPredio(id)
        if(len(capturar_predio) > 0):
            return jsonify({'predio':capturar_predio, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})