from utils.ma import ma
from marshmallow import fields
from schemas.predio_schema import PredioSchema
from schemas.estado_schema import EstadoSchema
from schemas.tipo_autorizacion_schema import TipoAutorizacionSchema
from schemas.tipo_moneda_schema import TipoMonedaSchema
from schemas.banco_schema import BancoSchema
class CuentaPredioSchema(ma.Schema):

        id_cuenta_predio  = fields.Integer()
        id_predio = fields.Integer()
        id_estado = fields.Integer()
        id_tipo_autorizacion = fields.Integer()
        id_banco = fields.Integer()
        id_tipo_moneda = fields.Integer()
        ncuenta = fields.Integer()
        ntarjeta = fields.Integer()
        fecha_apertura = fields.Date()
        fecha_autorizacion = fields.Date()
        fecha_cierre = fields.Date()
        correo_autorizado = fields.String()

        predio = fields.Nested(PredioSchema)
        estado = fields.Nested(EstadoSchema)
        tipo_autorizacion = fields.Nested(TipoAutorizacionSchema)
        banco = fields.Nested(BancoSchema)
        tipo_moneda = fields.Nested(TipoMonedaSchema)