from utils.ma import ma
from marshmallow import fields

class RegistroPredioEstadoSchema(ma.Schema):
    id_registro_predio_estado = fields.Integer()
    id_predio = fields.Integer()
    id_personal = fields.Integer()
    id_estado = fields.Integer()
    periodo = fields.String()
    descripcion = fields.String()