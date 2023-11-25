from utils.ma import ma
from marshmallow import fields

class DescripGastosSchema(ma.Schema):
    id_gasto = fields.Integer()
    descripcion = fields.String()
