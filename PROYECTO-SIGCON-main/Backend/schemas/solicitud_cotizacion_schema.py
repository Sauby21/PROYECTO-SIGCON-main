from utils.ma import ma
from marshmallow import fields
from models.solicitud_cotizacion import SolicitudCotizacion
from schemas.personal_schema import PersonalSchema
from schemas.estado_schema import EstadoSchema
from schemas.solicitud_schema import SolicitudSchema

class SolicitudCotizacionSchema(ma.Schema):

    class Meta:
        model = SolicitudCotizacion
        fields = ('id_solicitud', 
                  'id_personal',
                  'fecha_cotizacion',
                  'importe',
                  'id_solicitud_cotizacion',
                  'id_estado',
                  'solicitud',
                  'personal',
                  'estado')
    solicitud = ma.Nested(SolicitudSchema)
    personal = ma.Nested(PersonalSchema)
    estado = ma.Nested(EstadoSchema)

solicitud_cotizacion_schema = SolicitudCotizacionSchema()
solicitudes_cotizacion_schema = SolicitudCotizacionSchema(many=True)