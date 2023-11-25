from flask import Blueprint, render_template as rt, request, url_for, redirect

login = Blueprint('login', __name__) #al llamar el blue print en base sería (NomreBP.FuncionAsociadaARuta)

@login.route('/login', methods=['GET', 'POST'])
def index(): #esta función debe coincidir con el url_for del html (base)
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        data_prueba = {
            "antonyctmre@gmail.com":{
                "password": "qwerty",
                "nombre": "Antony",
                "apellido": "Vargas",
                "cargo": "Contratista"
            },
            "arnold8900@gmail.com":{
                "password": "qwerty",
                "nombre": "Arnold",
                "apellido": "Camacho",
                "cargo": "Admin"
            }
        }
        
        if email in data_prueba.keys():
            # Los datos coinciden, realizar acciones adicionales
            d_password = data_prueba.get(email).get("password")
            if password==d_password:
                print("Exito")
                return redirect(url_for('principal.principal'))
            else:
                print("Fallo")
        else:
            # Los datos no coinciden, mostrar mensaje de error
            print("Fallo")
    return rt("SeguirSolicitudCotizacion/login.html") #El rendertemplate siempre buscará el archivo en templates