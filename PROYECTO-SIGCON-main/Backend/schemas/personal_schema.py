from utils.ma import ma
from marshmallow import fields
from models.personal import Personal
from schemas.persona_schema import PersonaSchema
from schemas.rol_schema import RolSchema

class PersonalSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Personal
        fields = ('id_personal', 
                  'id_persona', 
                  'id_rol', 
                  'fecha_contrato', 
                  'fecha_cese',
                  'persona',
                  'rol')

    persona = ma.Nested(PersonaSchema)
    rol = ma.Nested(RolSchema)

personal_schema = PersonalSchema()
personales_schema = PersonalSchema(many=True)