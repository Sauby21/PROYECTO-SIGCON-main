from utils.ma import ma
from models.persona import Persona
from marshmallow import fields
from schemas.tipo_documento_schema import TipoDocumentoSchema
from schemas.ubigeo_schema import UbigeoSchema

class PersonaSchema(ma.Schema):
    class Meta:
        model = Persona
        fields = ('id_persona',
                  'apellido_paterno',
                  'apellido_materno',
                  'nombres',
                  'fecha_nacimiento',
                  'id_tipo_documento',
                  'ndocumento',
                  'direccion',
                  'idubigeo',
                  'tipo_documento',
                  'ubigeo',
                  'nombre_completo')

    tipo_documento = ma.Nested(TipoDocumentoSchema)
    ubigeo = ma.Nested(UbigeoSchema)
    #extra
    nombre_completo = ma.Method('get_nombre_completo')

    def get_nombre_completo(self, obj):
        return obj.apellido_paterno + ' ' + obj.apellido_materno + ' ' + obj.nombres

persona_schema = PersonaSchema()
personas_schema = PersonaSchema(many=True)