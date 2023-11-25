from utils.ma import ma
from marshmallow import fields

class GastosSchema(ma.Schema):
    id_predio_gastos = fields.Integer()
    periodo = fields.String()
