from utils.db import db

class Gastos(db.Model):
    id_predio_gastos =     db.Column(db.Integer, primary_key=True)
    periodo =              db.Column(db.String(100))

    def __init__(self, per) -> None:
        self.periodo = per

    def to_json(self):
        return {
            'id_predio_gastos': self.id_predio_gastos,
            'periodo': self.periodo
        }