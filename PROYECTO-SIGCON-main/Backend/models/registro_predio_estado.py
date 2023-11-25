from utils.db import db

class RegistroPredioEstado(db.Model):
    id_registro_predio_estado =     db.Column(db.Integer, primary_key=True)
    id_predio =       db.Column(db.Integer)
    id_personal = db.Column(db.Integer)
    id_estado = db.Column(db.Integer)
    periodo = db.Column(db.String(100))
    descripcion = db.Column(db.String(100))
    def __init__(self, id_predio, id_personal,id_estado,periodo,descripcion) -> None:
        self.id_predio = id_predio
        self.id_personal = id_personal
        self.id_estado = id_estado
        self.periodo = periodo
        self.descripcion = descripcion
        
    def to_json(self):
        return {
            'id_registro_predio_estado': self.id_registro_predio_estado,
            'id_predio':self.id_predio,
            'id_personal':self.id_personal,
            'id_estado':self.id_estado,
            'periodo':self.periodo,
            'descripcion':self.descripcion
        }