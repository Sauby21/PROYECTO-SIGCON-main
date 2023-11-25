from flask import Blueprint, render_template as rt, request, url_for, redirect,make_response
from flask import flash, request
from models.persona import Persona
from models.cuenta import Cuenta
from models.recaudacion import Recaudacion
from schemas.recaudacion_schema import recaudacion_schema,recaudaciones_schema
from models.mant_recibo import MantRecibo
from flask import jsonify
from models.predio import Predio
from models.cuenta_predio import CuentaPredio  
from utils.db import db
from models.casa import Casa
from models.recaudacion_estado import RecaudacionEstado
recaudacion = Blueprint('recaudaciones', __name__)

@recaudacion.route('/BuscarRecaudacion', methods=['GET'])
def buscar_recaudaciones():
    recaudaciones = Recaudacion.query.all();
    resultado = recaudaciones_schema.dump(recaudaciones);
    response ={
        'success': True,
        'data': resultado
    }
    return make_response(jsonify(response),200)


@recaudacion.route('/agregar', methods=['POST'])
def agregar_datos():
 
    id_cuenta = request.json.get('id_cuenta')
    id_mant_recibo = request.json.get('id_mant_recibo')    
    n_operacion = request.json.get('n_operacion')
    fecha_operacion = request.json.get('fecha_operacion')
    id_tipo_moneda = request.json.get('id_tipo_moneda')
    importe = request.json.get('importe')
    id_recaudacion_estado = request.json.get('id_recaudacion_estado')
    id_cuenta_predio = request.json.get('id_cuenta_predio')
    observacion = request.json.get('observacion')

    new_recaudacion = Recaudacion(id_cuenta,id_mant_recibo,n_operacion,fecha_operacion,id_tipo_moneda,importe,id_recaudacion_estado,id_cuenta_predio,observacion)
    db.session.add(new_recaudacion)
    db.session.commit()

    resultado = recaudacion_schema.dump(new_recaudacion)

    data={
        'message' : 'Nueva Recaudacion agregada',
        'status:' : 201,
        'data' : resultado
    }

    return make_response(jsonify(data),201)


@recaudacion.route('/editar/<int:id_recaudacion>', methods=['PUT'])
def editar_recaudacion(id_recaudacion):
    recaudacion = Recaudacion.query.get(id_recaudacion)

    if not recaudacion:
        data = {
            'message': 'Recaudacion no encontrada',
            'status': 404            
        }
        return make_response(jsonify(data),404)
    
    fecha_operacion = request.json.get('fecha_operacion')
    id_recaudacion_estado = request.json.get('id_recaudacion_estado')
    observacion = request.json.get('observacion')

    recaudacion.fecha_operacion = fecha_operacion
    recaudacion.id_recaudacion_estado = id_recaudacion_estado
    recaudacion.observacion = observacion

    db.session.commit()
    resultado = recaudacion_schema.dump(recaudacion)

    data = {
        'message': 'Recaudacion actualizada',
        'status': 200,
        'data': resultado
    }
    
    return make_response(jsonify(data),200)


@recaudacion.route('/eliminar/<int:id_recaudacion>', methods=['DELETE'])
def eliminar_recaudacion(id_recaudacion):
    recaudacion = Recaudacion.query.get(id_recaudacion)

    if not recaudacion:
        data = {
            'message': 'Recaudacion no encontrada',
            'status': 404            
        }
        return make_response(jsonify(data),404)   

    db.session.delete(recaudacion)
    db.session.commit()

    data = {
        'message': 'Recaudacion eliminada',
        'status': 200        
    } 

    return make_response(jsonify(data),200)