from utils.db import db

class RecaudacionEstado(db.Model):
    __tablename__ = 'recaudacion_estado'
    id_recaudacion_estado =db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(15))
    def __init__(self, id_recaudacion_estado, descripcion):
        self.id_recaudacion_estado= id_recaudacion_estado
        self.descripcion = descripcion
