from utils.ma import ma
from marshmallow import fields

class PrediosSchema(ma.Schema):
    id_predio = fields.Integer()
    predio = fields.String()
    responsable = fields.String()
