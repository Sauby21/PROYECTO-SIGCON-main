from flask import Flask,render_template
from routes.SolicitarCotizacion.persona_routes import persona_routes
from routes.SolicitarCotizacion.rol_routes import rol_routes
from routes.SolicitarCotizacion.solicitante_routes import solicitante_routes
from routes.SolicitarCotizacion.solicitud_routes import solicitud_routes
from routes.SolicitarCotizacion.tipo_documento_routes import tipo_documento_routes
from routes.SolicitarCotizacion.predio_routes import predio_routes
from routes.SolicitarCotizacion.servicio_routes import servicio_routes
from routes.SolicitarCotizacion.tipo_predio_routes import tipo_predio_routes
from routes.SolicitarCotizacion.ubigeo_routes import ubigeo_routes
from routes.SolicitarCotizacion.personal_routes import personal_routes
from routes.SolicitarCotizacion.area_comun_routes import area_comun_routes
from routes.SolicitarCotizacion.predio_area_comun_routes import predio_area_comun_routes
from flask_sqlalchemy import SQLAlchemy
from config import DATABASE_CONNECTION_URI
from flask_cors import CORS
from utils.db import db
from routes.RegistrarRecaudaciones.buscarRecibos import recibo
from routes.RegistrarRecaudaciones.recaudaciones import recaudacion
#from routes.SeguirSolicitudCotizacion.vista_solicitud import vistasolicitud
from routes.SeguirSolicitudCotizacion.boleta import boleta
from routes.SeguirSolicitudCotizacion.cotizaciones import cotizacion
from routes.SeguirSolicitudCotizacion.index import index_vestibulo
from routes.SeguirSolicitudCotizacion.login import login
from routes.SeguirSolicitudCotizacion.solicitud_cotizacion import solicitud_cotizacion
from routes.EmitirRecibos.predio import predio
from routes.EmitirRecibos.predios import predios
from routes.EmitirRecibos.tabla_casas import tabla_casas
from routes.EmitirRecibos.descrip_gastos import descrip_gastos
from routes.EmitirRecibos.gastos_predio import gastos_predio
from routes.EmitirRecibos.registro_predio_estado import registro_predio_estado
from routes.EmitirRecibos.tipo_gastos import tipo_gastos
from routes.EmitirRecibos.gastos import gastos
from routes.EmitirRecibos.gasto_registrado import gasto_registrado
from routes.FirmarContrato.login import login_bp
from routes.FirmarContrato.contratos import routes
from routes.FirmarContrato.principal import bp
from utils.config import Config
from flask_cors import CORS
app = Flask(__name__)

        
CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, supports_credentials=True)
    

    

app.secret_key = 'clavesecreta123'

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_CONNECTION_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_POOL_SIZE"] = 20
app.config["SQLALCHEMY_POOL_TIMEOUT"] = 30
app.config["SQLALCHEMY_POOL_RECYCLE"] = 1800

# no cache
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

db.init_app(app)
app.register_blueprint(recibo)    
app.register_blueprint(recaudacion)
app.register_blueprint(persona_routes)
app.register_blueprint(rol_routes)
app.register_blueprint(solicitante_routes)
app.register_blueprint(solicitud_routes)
app.register_blueprint(tipo_documento_routes)
app.register_blueprint(predio_routes)
app.register_blueprint(servicio_routes)
app.register_blueprint(tipo_predio_routes)
app.register_blueprint(ubigeo_routes)
app.register_blueprint(personal_routes)
app.register_blueprint(area_comun_routes)
app.register_blueprint(predio_area_comun_routes)
#app.register_blueprint(vistasolicitud)
app.register_blueprint(boleta)
app.register_blueprint(cotizacion)
app.register_blueprint(index_vestibulo)
app.register_blueprint(login)
app.register_blueprint(solicitud_cotizacion)
app.register_blueprint(descrip_gastos)
app.register_blueprint(gasto_registrado)
app.register_blueprint(gastos_predio)
app.register_blueprint(gastos)
app.register_blueprint(predio)
app.register_blueprint(predios)
app.register_blueprint(registro_predio_estado)
app.register_blueprint(tabla_casas)
app.register_blueprint(tipo_gastos)
app.register_blueprint(login_bp)
app.register_blueprint(routes)      
app.register_blueprint(bp)


