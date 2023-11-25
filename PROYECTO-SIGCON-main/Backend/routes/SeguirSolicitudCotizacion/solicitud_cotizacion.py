from flask import Blueprint, render_template as rt  ,make_response,jsonify
from models.solicitud import Solicitud
from models.solicitud_cotizacion import SolicitudCotizacion
from schemas.solicitud_schema import solicitud_schema,solicitudes_schema
from schemas.solicitud_cotizacion_schema import solicitud_cotizacion_schema,solicitudes_cotizacion_schema

solicitud_cotizacion = Blueprint('solicitud_cotizacion', __name__, url_prefix="/solicitud") #al llamar el blue print en base sería (NomreBP.FuncionAsociadaARuta)

@solicitud_cotizacion.route('/<id_solicitud>', methods=['GET'])
def cotizar(id_solicitud):
    
    solicitud_cotizacion = SolicitudCotizacion.query.filter_by(id_solicitud=id_solicitud).first()
    
    if solicitud_cotizacion:
        cotizacion_realizada = "Realizada"
        data = solicitud_cotizacion_schema.dump(solicitud_cotizacion)
    else:
        cotizacion_realizada = "No realizada"
        solicitud=Solicitud.query.get(id_solicitud)
        data = solicitud_schema.dump(solicitud)
    
    responsep = {
        'success': True,
        'data': data
    }
    return make_response(jsonify(responsep),200)
    return rt("SeguirSolicitudCotizacion/cotizacion.html",data=data,cotizacion_realizada=cotizacion_realizada)