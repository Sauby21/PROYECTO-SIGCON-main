from utils.ma import ma
from marshmallow import fields

class ReciboEstadoSchema(ma.Schema):
    id_recibo_estado = fields.Integer()
    descripcion = fields.String()