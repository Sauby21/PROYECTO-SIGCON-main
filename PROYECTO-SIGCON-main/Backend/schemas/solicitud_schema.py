from utils.ma import ma
from marshmallow import fields
from models.solicitud import Solicitud
from schemas.predio_schema import PredioSchema
from schemas.solicitante_schema import SolicitanteSchema
from schemas.servicio_schema import ServicioSchema

class SolicitudSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Solicitud
        fields = ('id_solicitud', 
                  'id_predio', 
                  'id_solicitante', 
                  'id_servicio', 
                  'area_predio', 
                  'num_casas', 
                  'cant_acomunes', 
                  'area_acomunes', 
                  'cant_vigilantes', 
                  'cant_plimpieza', 
                  'cant_administracion', 
                  'cant_jardineria', 
                  'fecha_solicitud', 
                  'nombre_solicitante',
                  'predio',
                  'solicitante',
                  'servicio')
    predio = ma.Nested(PredioSchema)
    solicitante = ma.Nested(SolicitanteSchema)
    servicio = ma.Nested(ServicioSchema)

solicitud_schema = SolicitudSchema()
solicitudes_schema = SolicitudSchema(many=True)