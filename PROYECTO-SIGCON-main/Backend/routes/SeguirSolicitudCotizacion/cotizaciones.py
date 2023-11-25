from flask import Blueprint, render_template as rt, request, redirect, url_for ,make_response,jsonify
from models.solicitud_cotizacion import SolicitudCotizacion
from models.solicitud import Solicitud
from models.persona import Persona
from models.personal import Personal
from models.predio import Predio
from models.rol import Rol
from models.servicio import Servicio
from models.solicitante import Solicitante
from models.solicitud import Solicitud
from models.solicitud_cotizacion import SolicitudCotizacion
from models.tipo_documento import TipoDocumento
from models.tipo_predio import TipoPredio
from models.ubigeo import Ubigeo
from schemas.solicitud_schema import solicitud_schema,solicitudes_schema
from schemas.solicitud_cotizacion_schema import solicitud_cotizacion_schema,solicitudes_cotizacion_schema
from models.estado import Estado
from utils.db import db
from utils.id import formatear_id
from utils.json import model_to_dict
from datetime import datetime

cotizacion = Blueprint('cotizaciones', __name__, url_prefix="/cotizaciones")

@cotizacion.route('/cotizacionesp', methods=['POST','GET'])
def cotizacionesp():
    # Obtener todas las solicitudes
    solicitudes = Solicitud.query.all()

    solicitudes_con_cotizaciones = SolicitudCotizacion.query.all()
    solicitudes_con_cotizaciones_ids = [cotizacion.id_solicitud for cotizacion in solicitudes_con_cotizaciones]
    
    # Obtener las cotizaciones pendientes y completadas
    cotizaciones_pendientes = [solicitud for solicitud in solicitudes if solicitud.id_solicitud not in solicitudes_con_cotizaciones_ids]
    #cotizaciones_completadas = solicitudes_con_cotizaciones

    # Ordenar las solicitudes
    cotizaciones_pendientes = sorted(cotizaciones_pendientes, key=lambda solicitud: solicitud.id_solicitud)
    #cotizaciones_completadas = sorted(cotizaciones_completadas, key=lambda solicitud: solicitud.id_solicitud)

    # Serializar los objetos por medio de schemas
    #cotizaciones_pendientes_serializadas = SolicitudSchema(many=True).dump(cotizaciones_pendientes)
    cotizaciones_pendientes_serializadas = solicitudes_schema.dump(cotizaciones_pendientes)
    #cotizaciones_completadas_serializadas = solicitudes_cotizacion_schema.dump(cotizaciones_completadas)
   
    responsep = {
        'success': True,
        'data_pendientes': cotizaciones_pendientes_serializadas
    }
    return make_response(jsonify(responsep),200)

    bandera = ''
    if request.method == "POST":
        bandera = request.form.get('btn-atras')
    
    return rt("SeguirSolicitudCotizacion/cotizaciones.html", cotizaciones_pendientes=cotizaciones_pendientes_serializadas, 
              cotizaciones_completadas=cotizaciones_completadas_serializadas,formatear_id=formatear_id,bandera=bandera)

@cotizacion.route('/cotizacionesc', methods=['POST','GET'])
def cotizacionesc():
    # Obtener todas las solicitudes
    solicitudes = Solicitud.query.all()

    solicitudes_con_cotizaciones = SolicitudCotizacion.query.all()
    #solicitudes_con_cotizaciones_ids = [cotizacion.id_solicitud for cotizacion in solicitudes_con_cotizaciones]
    
    # Obtener las cotizaciones pendientes y completadas
    #cotizaciones_pendientes = [solicitud for solicitud in solicitudes if solicitud.id_solicitud not in solicitudes_con_cotizaciones_ids]
    cotizaciones_completadas = solicitudes_con_cotizaciones

    # Ordenar las solicitudes
    #cotizaciones_pendientes = sorted(cotizaciones_pendientes, key=lambda solicitud: solicitud.id_solicitud)
    cotizaciones_completadas = sorted(cotizaciones_completadas, key=lambda solicitud: solicitud.id_solicitud)

    # Serializar los objetos por medio de schemas
    #cotizaciones_pendientes_serializadas = SolicitudSchema(many=True).dump(cotizaciones_pendientes)
    #cotizaciones_pendientes_serializadas = solicitudes_schema.dump(cotizaciones_pendientes)
    cotizaciones_completadas_serializadas = solicitudes_cotizacion_schema.dump(cotizaciones_completadas)
   
    responsec = {
        'success': True,
        'data_completadas': cotizaciones_completadas_serializadas
    }
    return make_response(jsonify(responsec),200)

    bandera = ''
    if request.method == "POST":
        bandera = request.form.get('btn-atras')
    
    return rt("SeguirSolicitudCotizacion/cotizaciones.html", cotizaciones_pendientes=cotizaciones_pendientes_serializadas, 
              cotizaciones_completadas=cotizaciones_completadas_serializadas,formatear_id=formatear_id,bandera=bandera)


@cotizacion.route('/vista_solicitud',methods=['GET'])
def vista(): #esta función debe coincidir con el url_for del html (base)
    persona =Persona.query.all()
    personal =Personal.query.all()
    predio =Predio.query.all()
    rol =Rol.query.all()
    servicio =Servicio.query.all()
    solicitante =Solicitante.query.all()
    solicitud =Solicitud.query.all()
    solicitudCotizacion =SolicitudCotizacion.query.all()
    tipoDocumento =TipoDocumento.query.all()
    tipoPredio =TipoPredio.query.all()
    ubigeo =Ubigeo.query.all()

    data_persona = []
    data_personal = []
    data_predio = []
    data_rol = []
    data_servicio = []
    data_solicitante = []
    data_solicitud = []
    data_solicitudCotizacion = []
    data_tipoDocumento = []
    data_tipoPredio = []
    data_ubigeo = []

    # Crear una lista para almacenar los datos convertidos a json
    for obj in persona:
        x = model_to_dict(obj)
        data_persona.append(x)
    for obj in personal:
        x = model_to_dict(obj)
        data_personal.append(x)
    for obj in predio:
        x = model_to_dict(obj)
        data_predio.append(x)
    for obj in rol:
        x = model_to_dict(obj)
        data_rol.append(x)
    for obj in servicio:
        x = model_to_dict(obj)
        data_servicio.append(x)
    for obj in solicitante:
        x = model_to_dict(obj)
        data_solicitante.append(x)
    for obj in solicitud:
        x = model_to_dict(obj)
        data_solicitud.append(x)
    for obj in solicitudCotizacion:
        x = model_to_dict(obj)
        data_solicitudCotizacion.append(x)
    for obj in tipoDocumento:
        x = model_to_dict(obj)
        data_tipoDocumento.append(x)
    for obj in tipoPredio:
        x = model_to_dict(obj)
        data_tipoPredio.append(x)
    for obj in ubigeo:
        data_ubigeo=model_to_dict(obj)
    
    result = {
        'persona': data_persona,
        'personal': data_personal,
        'predio': data_predio,
        'rol': data_rol,
        'servicio': data_servicio,
        'solicitante': data_solicitante,
        'solicitud': data_solicitud,
        'solicitudCotizacion': data_solicitudCotizacion,
        'tipoDocumento': data_tipoDocumento,
        'tipoPredio': data_tipoPredio,
        'ubigeo': data_ubigeo
    }

    return make_response(jsonify(result),200)

@cotizacion.route('/predio')
def vista_predio():
    query =Predio.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'predio': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/tipo_predio')
def vista_tipo_predio():
    query =TipoPredio.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'tipo_predio': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/persona')
def vista_persona():
    query =Persona.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'persona': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/personal')
def vista_personal():
    query =Personal.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'personal': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/solicitante')
def vista_solicitante():
    query =Solicitante.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'solicitante': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/servicio')
def vista_servicio():
    query =Servicio.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'servicio': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/rol')
def vista_rol():
    query =Rol.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'rol': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/solicitud')
def vista_solicitud():
    query =Solicitud.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'solicitud': data
    }
    return make_response(jsonify(result),200)

@cotizacion.route('/solicitud_cotizacion')
def vista_solicitud_cotizacion():
    query =SolicitudCotizacion.query.all()
    data = []
    for obj in query:
        data.append(model_to_dict(obj))
    result = {
        'solicitud_cotizacion': data
    }
    return make_response(jsonify(result),200)

"""@cotizacion.route('/aceptar', methods=['POST'])
def aceptar():
    if request.method == "POST":
        # Obtener el id solicitud
        id_solicitud = request.form.get('aceptar__id_solicitud')

        # Se obtiene la solicitud
        solicitud = Solicitud.query.get(id_solicitud)
        #FECHA
        fecha_cotizacion = datetime.now().date()
        #ID_PERSONAL
        id_personal = 1 #por ahora default (se espera al login)
        #IMPORTE
        importe_total=0 #por ahora artificio
        pago = {
            "adm": 500,
            "limp": 300,
            "jar": 300,
            "vig": 400,
        }
        if solicitud.id_servicio == 1:
            total_adm = solicitud.cant_administracion*pago["adm"]
            total_lim = solicitud.cant_plimpieza*pago["limp"]
            total_jar = solicitud.cant_jardineria*pago["jar"]
            total_vig = solicitud.cant_vigilantes*pago["vig"]
            importe_total = total_adm+total_lim+total_jar+total_vig
        elif(solicitud.id_servicio==2):
            total_lim = solicitud.cant_plimpieza*pago["limp"]
            importe_total = total_lim
        elif(solicitud.id_servicio==3):
            total_jar = solicitud.cant_jardineria*pago["jar"]
            importe_total = total_jar
        elif(solicitud.id_servicio==4):
            total_vig = solicitud.cant_vigilantes*pago["vig"]
            importe_total = total_vig
        # Estado activo
        estado = Estado.query.get(1)

        new_solicitud_cotizacion = SolicitudCotizacion(id_solicitud,id_personal,fecha_cotizacion,importe_total,estado.id_estado)
        db.session.add(new_solicitud_cotizacion) # agregación
        db.session.commit() # confirmación
        
        return redirect(url_for('cotizaciones.cotizaciones'))

@cotizacion.route('/rechazar', methods=['POST'])
def rechazar():
    if request.method == "POST":
        id_solicitud = request.form.get('rechazar__id_solicitud')
        print("Rechazado: ",id_solicitud)
        return redirect(url_for('cotizaciones.cotizaciones'))"""

""" @bp.route("/update_predio/<string:id_predio>", methods=["GET", "POST"])
def update_predio(id_predio):
    # Obtener la data correspondiente al id recibido como argumento
    predio = Predio.query.get(id_predio)

    if request.method == "POST":
        # Obtener los nuevos datos del predio desde el formulario y actualizarlos en la base de datos
        predio.area = request.form['update_area']
        predio.areas_comunes = request.form['update_areascomunes']
        predio.NroPuertasAcceso = request.form['update_NroPuertasAcceso']
        predio.NroHabitaciones = request.form['update_NroHabitaciones']
        db.session.commit()

        # Mostrar un mensaje de éxito en la siguiente petición
        flash('Contact updated successfully!')

        # Redirigir a la página principal
        return redirect(url_for('vista.vista'))

    # Renderizar la página de actualización
    return rt("update_predio.html", predio=predio)

@bp.route("/update_representante/<string:id_representante>", methods=["GET", "POST"])
def update_representante(id_representante):
    # Obtener la data correspondiente al id recibido como argumento
    representante = PresidentePredio.query.get(id_representante)

    if request.method == "POST":
        # Obtener los nuevos datos del predio desde el formulario y actualizarlos en la base de datos
        representante.dni = request.form['update_documento']
        representante.apellidos = request.form['update_apellidos']
        representante.nombres = request.form['update_nombres']
        representante.predio_asignado = request.form['update_predio']
        representante.telefono = request.form['update_telefono']
        representante.correo = request.form['update_correo']
        db.session.commit()

        # Mostrar un mensaje de éxito en la siguiente petición
        flash('Contact updated successfully!')

        # Redirigir a la página principal
        return redirect(url_for('vista.vista'))

    # Renderizar la página de actualización
    return rt("update_representante.html", representante=representante)

@bp.route('/delete/<int:id_representante>/<int:id_predio>/<int:id_contrato>')
def delete(id_representante, id_predio, id_contrato):
    # Obtener el contacto correspondiente al id recibido como argumento
    predio= Predio.query.get(id_predio)
    representante= PresidentePredio.query.get(id_representante)
    contrato= Contrato.query.get(id_contrato)

    # Eliminar el contacto de la base de datos y confirmar la operación
    db.session.delete(representante)
    db.session.commit()
    db.session.delete(contrato)
    db.session.delete(predio)
    db.session.commit()
    # Mostrar un mensaje de éxito en la siguiente petición
    flash('Datos eliminados correctamente!')

    # Redirigir a la página principal
    return redirect(url_for('vista.vista')) """