from utils.db import db


class mdu(db.Model):
    id_mdu = db.Column(db.SmallInteger, primary_key=True)
    descripcion = db.Column(db.String(30))

    def __init__(self, id_mdu, descripcion):
        self.id_mdu = id_mdu
        self.descripcion = descripcion