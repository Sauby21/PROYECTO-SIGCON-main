from utils.db import db

class Predios(db.Model):
    id_predio =     db.Column(db.Integer, primary_key=True)
    predio =        db.Column(db.String(100))
    responsable =   db.Column(db.String(100))

    def __init__(self, predio, responsable) -> None:
        self.predio = predio
        self.responsable = responsable

    def to_json(self):
        return {
            'id_predio': self.id_predio,
            'predio': self.predio,
            'responsable': self.responsable
        }