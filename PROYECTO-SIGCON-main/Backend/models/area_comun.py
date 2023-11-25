from utils.db import db

class AreaComun(db.Model):
    __tablename__ = 'area_comun'
    id_area_comun = db.Column(db.Integer(), primary_key = True)
    descripcion = db.Column(db.String(50)) 
    
    def __init__(self, id_area_comun, descripcion):
        self.id_area_comun = id_area_comun
        self.descripcion = descripcion