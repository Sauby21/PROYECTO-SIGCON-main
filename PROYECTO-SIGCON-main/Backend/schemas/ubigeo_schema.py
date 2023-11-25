from utils.ma import ma
from marshmallow import fields

class UbigeoSchema(ma.Schema):
    idubigeo = fields.String()
    departamento = fields.String()
    provincia = fields.String()
    distrito = fields.String()
    superficie = fields.Number()
    altitud = fields.Number()
    latitud = fields.Number()
    longitud = fields.Number()

ubigeo_schema = UbigeoSchema()
ubigeos_schema = UbigeoSchema(many=True)