from utils.db import db

class Banco(db.Model):
    __tablename__ = 'banco'
    id_banco = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String)

    def __init__(self, id_banco, descripcion):
        self.id_banco = id_banco
        self.descripcion = descripcion