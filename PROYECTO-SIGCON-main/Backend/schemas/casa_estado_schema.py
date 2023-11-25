from utils.ma import ma
from marshmallow import fields
class CasaEstadoSchema(ma.Schema):
    id_estado = fields.Integer()
    descripcion = fields.String()