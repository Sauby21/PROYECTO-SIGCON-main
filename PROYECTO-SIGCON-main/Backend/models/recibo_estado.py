from utils.db import db

class ReciboEstado(db.Model):
    __tablename__ = 'recibo_estado'
    id_recibo_estado = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(15))

    def __init__(self, id_recibo_estado, descripcion):
        self.id_recibo_estado = id_recibo_estado
        self.descripcion = descripcion