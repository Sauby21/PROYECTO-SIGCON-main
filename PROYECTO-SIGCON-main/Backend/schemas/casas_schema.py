from utils.ma import ma
from marshmallow import fields

class CasasSchema(ma.Schema):
    id_indice = fields.Integer()
    id_predio = fields.Integer()
    id_casa = fields.Integer()
    mdu = fields.String()
    numero = fields.Integer()
    piso = fields.Integer()
    estado = fields.String()
    responsable = fields.String()
    area_casa = fields.Integer()
    area_cochera = fields.Integer()
    area_total = fields.Integer()
    participacion = fields.Integer()
