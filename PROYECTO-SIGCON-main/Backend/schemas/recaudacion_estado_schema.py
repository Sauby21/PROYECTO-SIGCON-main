from utils.ma import ma
from marshmallow import fields

class RecaudacionEstadoSchema(ma.Schema):
    id_recaudacion_estado = fields.Integer()
    descripcion = fields.String()
