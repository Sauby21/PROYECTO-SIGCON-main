from utils.ma import ma
from marshmallow import fields

class TipoGastosSchema(ma.Schema):
    id_tipo_gasto = fields.Integer()
    descripcion = fields.String()