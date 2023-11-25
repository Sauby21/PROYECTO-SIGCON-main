from utils.db import db

class TipoMoneda(db.Model):
    __tablename__ = 'tipo_moneda'
    id_tipo_moneda = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(10))
    etiqueta = db.Column(db.String(4))
    
    def __init__(self, id_tipo_moneda, descripcion, etiqueta):
        self.id_tipo_moneda = id_tipo_moneda
        self.descripcion = descripcion
        self.etiqueta = etiqueta
