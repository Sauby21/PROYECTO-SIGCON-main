from utils.db import db
from models.recibo_estado import ReciboEstado
from models.casa import Casa
class MantRecibo(db.Model):
    __tablename__ = 'mant_recibo'
    id_mant_recibo = db.Column(db.Integer, primary_key=True)
    id_casa = db.Column(db.Integer, db.ForeignKey('casa.id_casa'))
    n_recibo = db.Column(db.String(8))
    periodo = db.Column(db.String(8))
    fecha_emision = db.Column(db.Date)
    fecha_vencimiento = db.Column(db.Date)
    importe = db.Column(db.DECIMAL)
    ajuste = db.Column(db.DECIMAL(6,2))
    observacion = db.Column(db.String(100))
    id_recibo_estado = db.Column(db.Integer, db.ForeignKey('recibo_estado.id_recibo_estado'))

    casa = db.relationship('Casa', backref='mantRecibo')
    recibo_estado = db.relationship('ReciboEstado', backref='mantRecibo')

    def __init__(self, id_mant_recibo, id_casa, periodo, n_recibo, fecha_emision,
                 fecha_vencimiento,importe, ajuste, observacion, id_recibo_estado,casa,recibo_estado):
        self.id_mant_recibo = id_mant_recibo
        self.id_casa = id_casa
        self.periodo = periodo
        self.n_recibo = n_recibo
        self.fecha_emision = fecha_emision
        self.fecha_vencimiento = fecha_vencimiento
        self.importe = importe
        self.ajuste = ajuste
        self.observacion = observacion
        self.id_recibo_estado = id_recibo_estado
        self.casa = casa
        self.recibo_estado=recibo_estado