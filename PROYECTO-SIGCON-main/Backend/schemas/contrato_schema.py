from marshmallow import Schema, fields


class ContratoSchema(Schema):
    id_contrato = fields.Integer()
    id_solicitud = fields.Integer()
    id_personal = fields.Integer()
    fecha_contrato = fields.Date()
    fecha_firma_solicitante = fields.Date()
    fecha_firma_personal = fields.Date()
    fecha_registro = fields.Date()
    
contrato_schema = ContratoSchema()
contratos_schema = ContratoSchema(many=True)