from utils.ma import ma
from marshmallow import fields

class TipoAutorizacionSchema(ma.Schema):
    id_tipo_autorizacion = fields.Integer()
    descripcion = fields.String()