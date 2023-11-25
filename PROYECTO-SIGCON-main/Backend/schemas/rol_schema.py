from utils.ma import ma
from marshmallow import fields
from models.rol import Rol

class RolSchema(ma.SQLAlchemySchema):
    id_rol = fields.Integer()
    descripcion = fields.String()
    class Meta:
        model = Rol
        fields = ('id_rol', 'descripcion')

rol_schema = RolSchema()
roles_schema = RolSchema(many=True)