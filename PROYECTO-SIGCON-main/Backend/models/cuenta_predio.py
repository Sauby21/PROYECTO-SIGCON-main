from utils.db import db
from models.predio import Predio
from models.estado import Estado
from models.tipo_autorizacion import TipoAutorizacion
from models.banco import Banco

class CuentaPredio(db.Model):
    __tablename__ = 'cuenta_predio'
    id_cuenta_predio = db.Column(db.Integer, primary_key=True)
    id_predio= db.Column(db.Integer, db.ForeignKey('predio.id_predio'))
    id_estado = db.Column(db.Integer, db.ForeignKey('estado.id_estado'))
    id_tipo_autorizacion = db.Column(db.Integer, db.ForeignKey('tipo_autorizacion.id_tipo_autorizacion'))
    id_banco= db.Column(db.Integer, db.ForeignKey('banco.id_banco'))
    id_tipo_moneda= db.Column(db.Integer, db.ForeignKey('tipo_moneda.id_tipo_moneda'))
    ncuenta = db.Column(db.Integer)
    ntarjeta = db.Column(db.Integer)
    fecha_apertura = db.Column(db.Date)
    fecha_autorizacion = db.Column(db.Date)
    fecha_cierre = db.Column(db.Date)
    correo_autorizado = db.Column(db.String(250))

    predio = db.relationship('Predio', backref='cuentaPredio')
    estado = db.relationship('Estado', backref='cuentaPredio')
    tipo_autorizacion = db.relationship('TipoAutorizacion', backref='cuentaPredio')
    banco = db.relationship('Banco', backref='cuentaPredio')
    tipo_moneda = db.relationship('TipoMoneda', backref='cuentaPredio')

    def __init__(self, id_cuenta_predio, id_predio, id_estado, id_tipo_autorizacion, id_banco, id_tipo_moneda, ncuenta, ntarjeta, fecha_apertura, fecha_autorizacion, fecha_cierre, correo_autorizado):
        self.id_cuenta_predio  = id_cuenta_predio 
        self.id_predio = id_predio
        self.id_estado = id_estado
        self.id_tipo_autorizacion = id_tipo_autorizacion
        self.id_banco = id_banco
        self.id_tipo_moneda = id_tipo_moneda
        self.ncuenta = ncuenta
        self.ntarjeta = ntarjeta
        self.fecha_apertura = fecha_apertura
        self.fecha_autorizacion = fecha_autorizacion
        self.fecha_cierre = fecha_cierre
        self.correo_autorizado = correo_autorizado