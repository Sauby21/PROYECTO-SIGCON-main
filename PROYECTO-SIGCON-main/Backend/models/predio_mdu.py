from utils.db import db


class predio_mdu(db.Model):
    id_predio_mdu = db.Column(db.Integer, primary_key=True)
    id_predio = db.Column(db.Integer)
    id_mdu = db.Column(db.SmallInteger)
    descripcion = db.Column(db.String(4))
    direccion = db.Column(db.String(10))
    numero = db.Column(db.String(10))

    def __init__(self, id_predio_mdu, id_predio, id_mdu, descripcion, direccion, numero):
        self.id_predio_mdu = id_predio_mdu
        self.id_predio = id_predio
        self.id_mdu = id_mdu
        self.descripcion = descripcion
        self.direccion = direccion
        self.numero = numero