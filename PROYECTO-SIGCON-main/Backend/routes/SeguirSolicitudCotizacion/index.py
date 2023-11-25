from flask import Blueprint, render_template as rt

index_vestibulo = Blueprint('index', __name__, url_prefix="/index") #al llamar el blue print en base sería (NomreBP.FuncionAsociadaARuta)

@index_vestibulo.route('/index')
def principal():
    return rt("SeguirSolicitudCotizacion/index.html")