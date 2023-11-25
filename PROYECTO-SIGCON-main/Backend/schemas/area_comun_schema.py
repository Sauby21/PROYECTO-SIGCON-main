from utils.ma import ma
from marshmallow import fields
from models.area_comun import AreaComun

class AreaComunSchema(ma.SQLAlchemySchema):
    class Meta:
        model = AreaComun
        fields = ('id_area_comun', 'descripcion')

areaComun_schema = AreaComunSchema()
areasComunes_schema = AreaComunSchema(many=True)