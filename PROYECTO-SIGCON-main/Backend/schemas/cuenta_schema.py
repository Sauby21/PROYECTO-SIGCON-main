from utils.ma import ma
from marshmallow import fields
from models.cuenta import Cuenta
from schemas.persona_schema import PersonaSchema
from schemas.banco_schema import BancoSchema
from schemas.tipo_moneda_schema import TipoMonedaSchema


class CuentaSchema(ma.Schema):
    class Meta:
        model = Cuenta
        fields = ('id_cuenta','id_persona','id_banco','id_tipo_moneda','ncuenta','persona','banco','tipo_moneda')

    persona = ma.Nested(PersonaSchema)
    banco = ma.Nested(BancoSchema)
    tipo_moneda = ma.Nested(TipoMonedaSchema)