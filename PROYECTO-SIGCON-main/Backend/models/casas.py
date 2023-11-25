from utils.db import db

class Casas(db.Model):
    id_indice =     db.Column(db.Integer)
    id_predio =     db.Column(db.Integer)
    id_casa =       db.Column(db.Integer, primary_key=True)
    mdu =           db.Column(db.String(100))
    numero =        db.Column(db.Integer)
    piso =          db.Column(db.Integer)
    estado =        db.Column(db.String(100))
    responsable =   db.Column(db.String(100))
    area_casa =     db.Column(db.Integer)
    area_cochera =  db.Column(db.Integer)
    area_total =    db.Column(db.Integer)
    participacion = db.Column(db.Integer)

    def __init__(self, id_ind, id_pre, md, num, pis, est, res, a_cas, a_coc, a_tot, par) -> None:
        self.id_indice = id_ind
        self.id_predio = id_pre
        self.mdu = md
        self.numero = num
        self.piso = pis
        self.estado = est
        self.responsable = res
        self.area_casa = a_cas
        self.area_cochera = a_coc
        self.area_total = a_tot
        self.participacion = par

    def to_json(self):
        return {
            'id_indice': self.id_indice,
            'id_predio': self.id_predio,
            'id_casa': self.id_casa,
            'mdu': self.mdu,
            'numero': self.numero,
            'piso': self.piso,
            'estado': self.estado,
            'responsable': self.responsable,
            'area_casa': self.area_casa,
            'area_cochera': self.area_cochera,
            'area_total': self.area_total,
            'participacion': self.participacion
        }
