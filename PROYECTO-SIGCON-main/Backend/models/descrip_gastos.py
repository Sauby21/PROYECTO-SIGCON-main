from utils.db import db

class DescripGastos(db.Model):
    id_gasto =          db.Column(db.Integer, primary_key=True)
    descripcion =       db.Column(db.String(100))

    def __init__(self, descripcion) -> None:
        self.descripcion = descripcion

    def to_json(self):
        return {
            'id_gasto': self.id_gasto,
            'descripcion': self.descripcion
        }