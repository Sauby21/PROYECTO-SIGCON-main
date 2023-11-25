from utils.ma import ma
from marshmallow import fields

class TipoDocumentoSchema(ma.Schema):
    id_tipo_documento = fields.Integer()
    descripcion = fields.String()

tipoDocumento_schema = TipoDocumentoSchema()
tiposDocumento_schema = TipoDocumentoSchema(many=True)