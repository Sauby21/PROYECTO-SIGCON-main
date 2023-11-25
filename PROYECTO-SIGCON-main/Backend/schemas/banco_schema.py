from utils.ma import ma
from marshmallow import fields

class BancoSchema(ma.Schema):
    id_banco = fields.Integer()
    descripcion = fields.String()
