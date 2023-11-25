from utils.ma import ma
from marshmallow import fields

class GastoPredioSchema(ma.Schema):
    id_predio_gastos_det = fields.Integer()
    descripcion = fields.String()
    importe = fields.Float()
    id_gasto = fields.Integer()
    id_tipo_gasto = fields.String()
    des_gasto = fields.String()
