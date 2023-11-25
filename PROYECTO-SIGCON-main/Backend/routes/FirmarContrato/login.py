from flask import Blueprint, render_template as rt, request, url_for, redirect, session, jsonify
from routes.FirmarContrato.contratos import borrar_cache
from flask import make_response

login_bp = Blueprint('login2', __name__)
@login_bp.route('/login2', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response
    
    borrar_cache(["Vacio.png"])
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        data_prueba = {
            "condosasolicitante2@gmail.com":{
                "password": "qwerty",
                "nombre": "Antony",
                "apellido": "Vargas",
                "cargo": "Contratista",
                "tipo": "solicitante",
                "id": "5"
            },
            "arnold8900@gmail.com":{
                "password": "qwerty",
                "nombre": "Arnold",
                "apellido": "Camacho",
                "cargo": "Admin",
                "tipo": "personal",
                "id": "1"
            },
            "condosasolicitante@gmail.com":{
                "password": "qwerty",
                "nombre": "Luis",
                "apellido": "Jimenez",
                "cargo": "Pdte Junta Propietarios",
                "tipo": "solicitante",
                "id": "1"
            },
            
        }

        
        if email in data_prueba:
            print(email)
            print(password)
            d_password = data_prueba[email]['password']
            if password == d_password:
                print("Éxito")
                id = data_prueba[email]['1']
                tipo = data_prueba[email]['1']
                session['correo_usuario'] = email
                response_data = {
                    "message": "Inicio de sesión exitoso",
                    "user_id": id,
                    "user_type": tipo
                }
                response = make_response(jsonify(response_data))
                response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                return response
            else:
                print("Fallo: Contraseña incorrecta")
        else:
            
            print("Fallo: Usuario no encontrado")

    return make_response(jsonify(data_prueba), 200)