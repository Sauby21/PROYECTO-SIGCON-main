from utils.ma import ma
from marshmallow import fields

class TipoMonedaSchema(ma.Schema):
    id_tipo_moneda = fields.Integer()
    descripcion = fields.String()
    etiqueta = fields.String()