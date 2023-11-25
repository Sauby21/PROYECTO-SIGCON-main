from utils.ma import ma
from models.casa import Casa
from marshmallow import fields
from schemas.predio_schema import PredioSchema
from schemas.casa_estado_schema import CasaEstadoSchema



class CasaSchema(ma.Schema):
    class Meta:
        model = Casa
        fields = ('id_casa',
                  'id_predio',
                  'id_estado',
                  'id_predio_mdu',
                  'numero',
                  'piso',
                  'area',
                  'participacion',
                  'predio',
                  'casa_estado')
    
    predio = ma.Nested(PredioSchema)
    casa_estado = ma.Nested(CasaEstadoSchema)
casa_schema = CasaSchema()
casas_schema = CasaSchema(many=True)