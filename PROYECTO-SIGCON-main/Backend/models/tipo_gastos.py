from utils.db import db

class TipoGastos(db.Model):
    id_tipo_gasto =     db.Column(db.Integer, primary_key=True)
    descripcion =       db.Column(db.String(100))

    def __init__(self, descripcion) -> None:
        self.descripcion = descripcion

    def to_json(self):
        return {
            'id_tipo_gasto': self.id_tipo_gasto,
            'descripcion': self.descripcion
        }