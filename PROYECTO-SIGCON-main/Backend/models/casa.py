from utils.db import db
from models.casa_estado import CasaEstado
from models.predio import Predio

class Casa(db.Model):
    __tablename__ = 'casa'
    id_casa = db.Column(db.Integer, primary_key=True)
    id_predio = db.Column(db.Integer, db.ForeignKey('predio.id_predio'))
    id_estado = db.Column(db.Integer, db.ForeignKey('casa_estado.id_estado'))
    #id_predio_mdu = db.Column(db.Integer, db.ForeignKey('predio_mdu.id_predio_mdu'))
    numero = db.Column(db.Integer)
    piso = db.Column(db.Integer)
    area = db.Column(db.DECIMAL)
    participacion = db.Column(db.DECIMAL(6, 2))
  

    predio = db.relationship('Predio', backref='casa')
    casa_estado = db.relationship('CasaEstado', backref='casa')
    #predio_mdu = db.relationship('predio_mdu', backref='casa')

    def __init__(self, id_casa, id_predio, id_estado, numero, piso,
                 area,participacion):
        self.id_casa = id_casa
        self.id_predio = id_predio
        self.id_estado = id_estado
        #self.id_predio_mdu = id_predio_mdu
        self.numero = numero
        self.piso = piso
        self.area = area
        self.participacion = participacion