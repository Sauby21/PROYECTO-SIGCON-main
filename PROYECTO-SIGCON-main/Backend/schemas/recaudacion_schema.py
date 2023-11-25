from utils.ma import ma
from marshmallow import fields
from models.recaudacion import Recaudacion
from schemas.cuenta_schema import CuentaSchema
from schemas.mant_recibo_schema import MantReciboSchema
from schemas.tipo_moneda_schema import TipoMonedaSchema
from schemas.recaudacion_estado_schema import RecaudacionEstadoSchema
from schemas.cuenta_predio_schema import CuentaPredioSchema


class RecaudacionSchema(ma.Schema):
    class Meta:
        model = Recaudacion
        fields = ('id_recaudacion',
                  'id_cuenta',
                  'id_mant_recibo',
                  'n_operacion',
                  'fecha_operacion',
                  'id_tipo_moneda',
                  'importe',
                  'id_recaudacion_estado',
                  'id_cuenta_predio',
                  'observacion',
                  'cuenta',
                  'mant_recibo',
                  'tipo_moneda',
                  'recaudacion_estado',
                  'cuenta_predio')
    cuenta = ma.Nested(CuentaSchema)
    mant_recibo = ma.Nested(MantReciboSchema)
    tipo_moneda= ma.Nested(TipoMonedaSchema)
    recaudacion_estado = ma.Nested(RecaudacionEstadoSchema)
    cuenta_predio = ma.Nested(CuentaPredioSchema)

recaudacion_schema = RecaudacionSchema()
recaudaciones_schema = RecaudacionSchema(many=True)