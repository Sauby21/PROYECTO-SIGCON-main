from utils.db import db
from models.persona import Persona
from models.banco import Banco
from models.tipo_moneda import TipoMoneda


class Cuenta(db.Model):
    __tablename__ = 'cuenta'
    id_cuenta = db.Column(db.Integer, primary_key=True)
    id_persona = db.Column(db.Integer, db.ForeignKey('persona.id_persona'))
    id_banco = db.Column(db.Integer, db.ForeignKey('banco.id_banco'))
    id_tipo_moneda = db.Column(db.Integer, db.ForeignKey('tipo_moneda.id_tipo_moneda'))
    ncuenta = db.Column(db.Integer)

    persona = db.relationship('Persona', backref='cuenta')
    banco = db.relationship('Banco', backref='cuenta')
    tipo_moneda = db.relationship('TipoMoneda', backref='cuenta')

    def __init__(self, id_cuenta, id_persona, id_banco, id_tipo_moneda,ncuenta):
        self.id_cuenta = id_cuenta
        self.id_persona = id_persona
        self.id_banco = id_banco
        self.id_tipo_moneda = id_tipo_moneda
        self.ncuenta = ncuenta
