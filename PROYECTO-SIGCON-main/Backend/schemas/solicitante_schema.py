from utils.ma import ma
from marshmallow import fields
from models.solicitante import Solicitante
from schemas.persona_schema import PersonaSchema
from schemas.rol_schema import RolSchema
class SolicitanteSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Solicitante
        fields = ('id_solicitante', 'id_persona', 'id_rol', 'telefono', 'correo','persona','rol')
    persona = ma.Nested(PersonaSchema)
    rol = ma.Nested(RolSchema)

solicitante_schema = SolicitanteSchema()
solicitantes_schema = SolicitanteSchema(many=True)