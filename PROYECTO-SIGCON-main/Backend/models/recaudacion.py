from utils.db import db
from models.cuenta import Cuenta
from models.mant_recibo import MantRecibo
from models.tipo_moneda import TipoMoneda
from models.recaudacion_estado import RecaudacionEstado
from models.cuenta_predio import CuentaPredio

class Recaudacion(db.Model):
    __tablename__ = 'recaudacion'
    id_recaudacion = db.Column(db.Integer, primary_key=True)
    id_cuenta = db.Column(db.Integer, db.ForeignKey('cuenta.id_cuenta'))
    id_mant_recibo = db.Column(db.Integer, db.ForeignKey('mant_recibo.id_mant_recibo'))
    n_operacion = db.Column(db.Integer)
    fecha_operacion= db.Column(db.Date)
    id_tipo_moneda = db.Column(db.Integer, db.ForeignKey('tipo_moneda.id_tipo_moneda'))
    importe = db.Column(db.DECIMAL)
    id_recaudacion_estado = db.Column(db.Integer,db.ForeignKey('recaudacion_estado.id_recaudacion_estado'))
    id_cuenta_predio = db.Column(db.Integer, db.ForeignKey('cuenta_predio.id_cuenta_predio'))
    observacion = db.Column(db.String(100))
    
    cuenta = db.relationship('Cuenta', backref='recaudacion')
    mant_recibo = db.relationship('MantRecibo', backref='recaudacion')
    tipo_moneda = db.relationship('TipoMoneda', backref='recaudacion')
    recaudacion_estado = db.relationship('RecaudacionEstado', backref='recaudacion')
    cuenta_predio = db.relationship('CuentaPredio', backref='recaudacion')      
    
    def __init__(self,  id_cuenta, id_mant_recibo, n_operacion, fecha_operacion, id_tipo_moneda, importe,id_recaudacion_estado, id_cuenta_predio, observacion):
        self.id_cuenta = id_cuenta
        self.id_mant_recibo = id_mant_recibo
        self.n_operacion = n_operacion
        self.fecha_operacion= fecha_operacion
        self.id_tipo_moneda = id_tipo_moneda
        self.importe = importe
        self.id_recaudacion_estado = id_recaudacion_estado
        self.id_cuenta_predio = id_cuenta_predio    
        self.observacion = observacion