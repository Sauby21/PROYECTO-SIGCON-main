from utils.db import db

class GastoPredio(db.Model):
    id_predio_gastos_det =      db.Column(db.Integer, primary_key=True)
    descripcion =               db.Column(db.String(100))
    importe =                   db.Column(db.Float)
    id_gasto =                  db.Column(db.Integer)
    id_tipo_gasto =             db.Column(db.String(100))
    des_gasto =                 db.Column(db.String(100))

    def __init__(self, des, imp, gas, tgas, dgas) -> None:
        self.descripcion = des
        self.importe = imp
        self.id_gasto = gas
        self.id_tipo_gasto = tgas
        self.des_gasto = dgas

    def to_json(self):
        return {
            'id_predio_gastos_det': self.id_predio_gastos_det,
            'descripcion': self.descripcion,
            'importe': self.importe,
            'id_gasto': self.id_gasto,
            'id_tipo_gasto': self.id_tipo_gasto,
            'des_gasto': self.des_gasto
        }