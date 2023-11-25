from utils.ma import ma
from marshmallow import fields
from models.mant_recibo import MantRecibo
from schemas.casa_schema import CasaSchema
from schemas.recibo_estado_schema import ReciboEstadoSchema

 

class MantReciboSchema(ma.Schema):
    class Meta:
        model = MantRecibo
        fields = ('id_mant_recibo','id_casa','n_recibo','periodo','fecha_emision','fecha_vencimiento','importe','ajuste','observacion','id_recibo_estado','casa','recibo_estado')        
    casa = ma.Nested(CasaSchema)
    recibo_estado = ma.Nested(ReciboEstadoSchema)

mant_recibo_schema=MantReciboSchema()
mant_recibos_schema=MantReciboSchema(many=True)

