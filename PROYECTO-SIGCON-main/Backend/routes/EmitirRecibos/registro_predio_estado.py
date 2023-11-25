from flask import Blueprint, jsonify, request
from services.get.getRegistroPredioEstado import getRegistroPredioEstado
from services.post.postRegistroPredioEstado import postRegistroPredioEstado
from services.put.putRegistroPredioEstado import putRegistroPredioEstado
from schemas.registro_predio_estado_schema import RegistroPredioEstadoSchema

registro_predio_estado = Blueprint('registro_predio_estado', __name__)

@registro_predio_estado.route('/getRegistroPredioEstado')
def registroPredioEstadoI():
    try:
        registros_predios_estados = getRegistroPredioEstado()
        if(len(registros_predios_estados) > 0):
            registros_serialized=RegistroPredioEstadoSchema().dump(registros_predios_estados, many=True)
            return jsonify({'registros_predios_estados':registros_serialized, 'message':"SUCCESS", 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})

@registro_predio_estado.route('/insertarRegistroPredioEstado', methods = ['POST'])
def insertar_registro_predio_estado():
    try:
        data = request.get_json()
        id_predio = data['id_predio']
        id_personal = data['id_personal']
        id_estado = data['id_estado']
        periodo = data['periodo']
        if(postRegistroPredioEstado(id_predio, id_personal, id_estado, periodo)):
            return jsonify({'message': data, 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})
    
@registro_predio_estado.route('/actualizarRegistroPredioEstado', methods = ['PUT'])
def actualizar_registro_predio_estado():
    try:
        data = request.get_json()
        id_estado = data['id_estado']
        id_predio = data['id_predio']
        periodo = data['periodo']
        if(putRegistroPredioEstado(id_estado, id_predio,periodo)):
            return jsonify({'message': data, 'success':True})
        else:
            return jsonify({'message':"NOT FOUND", 'success':True})
    except Exception as error:
        return jsonify({'message':'ERROR', 'success':False})