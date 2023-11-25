from flask import Blueprint, render_template as request, url_for, redirect,make_response
from flask import flash, request
from models.mant_recibo import MantRecibo
from models.casa import Casa
from models.predio import Predio
from models.persona import Persona
from models.cuenta import Cuenta
from models.cuenta_predio import CuentaPredio
from schemas.mant_recibo_schema import mant_recibo_schema,mant_recibos_schema
from flask import jsonify


recibo = Blueprint('recibo', __name__)

##------------BUSCAR POR NUMERO RECIBO---------------
@recibo.route('/buscarRecibo/<string:n_recibo>', methods=['GET'])
def buscar_nroRecibo(n_recibo):
    mantRecibo = MantRecibo.query.filter_by(n_recibo=n_recibo).first()
    casa = Casa.query.filter_by(id_casa=mantRecibo.id_casa).first()
    predio = Predio.query.filter_by(id_predio=casa.id_predio).first()
    persona = Persona.query.filter_by(id_persona=predio.id_persona).first()
    cuenta = Cuenta.query.filter_by(id_persona=persona.id_persona).first()
    cuentaPredio = CuentaPredio.query.filter_by(id_predio=predio.id_predio).first()

    if mantRecibo:
        # Si se encuentra el número de documento, obtener los valores correspondientes        
        resultado = mant_recibo_schema.dump(mantRecibo)
        estado = mantRecibo.recibo_estado.descripcion
        cuenta_id = cuenta.id_cuenta
        tipo_moneda = cuenta.id_tipo_moneda
        desc_moneda = cuenta.tipo_moneda.descripcion
        cuenta_predio = cuentaPredio.id_cuenta_predio      
                
        # Devolver la respuesta al cliente en formato JSON con los valores obtenidos
        response = {
            'success': True,
            'data': resultado,
            'estado': estado,
            'cuenta-id':cuenta_id,
            'id_tipo': tipo_moneda,
            'desc_tipo': desc_moneda,
            'cuenta-predio': cuenta_predio
        }
        return make_response(jsonify(response),200)
    else:
         
        # Si no se encuentra el número de documento, redirigir a la página inicial con un mensaje de error
        data = {
            'message': 'Persona no encontrada',
            'status': 404
        }
        return make_response(jsonify(data), 404)






    """
    num_recibo = request.form['num_recibo']

    # Lógica para buscar el número de recibo en la base de datos y obtener los valores correspondientes
    mantRecibo = MantRecibo.query.filter_by(n_recibo=num_recibo).first()
    
    if mantRecibo:
        # Si se encuentra el número de documento, obtener los valores correspondientes        
        recibo_estado = mantRecibo.recibo_estado.descripcion
        importe = mantRecibo.importe
        
        
        # Devolver la respuesta al cliente en formato JSON con los valores obtenidos
        response = {
            'success': True,
            'data': {
                'recibo_estado': recibo_estado,
                'importe' : importe
            }
        }
        return jsonify(response)
    else:
         
        # Si no se encuentra el número de documento, redirigir a la página inicial con un mensaje de error
        flash('Número de recibo no encontrado', 'error')
        return redirect(url_for('recaudaciones'))
    """