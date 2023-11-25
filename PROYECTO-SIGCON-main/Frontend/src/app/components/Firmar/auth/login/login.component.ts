import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { ConexionService } from 'src/app/services/conexion.service';
import { NombreUsuarioService } from 'src/app/services/nombre-usuario.service';



import Swal from 'sweetalert2';

interface Usuario {
  password: string;
  nombre: string;
  apellido: string;
  cargo: string;
  tipo: string;
  id: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = "";
  password: string = "";

  showPassword: boolean = false;

  constructor(private router: Router, private usuarioService: NombreUsuarioService) {}

  login(): void {
    const data_prueba: Record<string, Usuario> = {
      "condosasolicitante2@gmail.com": {
        "password": "qwerty",
        "nombre": "Antony",
        "apellido": "Vargas",
        "cargo": "Contratista",
        "tipo": "solicitante",
        "id": "5"
      },
      "arnold8900@gmail.com": {
        "password": "qwerty",
        "nombre": "Arnold",
        "apellido": "Camacho",
        "cargo": "Admin",
        "tipo": "personal",
        "id": "1"
      },
      "condosasolicitante@gmail.com": {
        "password": "qwerty",
        "nombre": "Luis",
        "apellido": "Jimenez",
        "cargo": "Pdte Junta Propietarios",
        "tipo": "solicitante",
        "id": "1"
      },
    };

    const usuarioEncontrado = data_prueba[this.correo];

    if (usuarioEncontrado && usuarioEncontrado.password === this.password) {
      // Inicio de sesión exitoso
      console.log("Inicio de sesión exitoso");
      this.usuarioService.nombreUsuario = usuarioEncontrado.nombre;
      this.usuarioService.id = usuarioEncontrado.id;
      this.usuarioService.tipo = usuarioEncontrado.tipo; // Guardar el tipo de usuario

      // Redireccionar a la ruta en Flask con los parámetros
      

      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Inicio de sesión exitoso.',
        confirmButtonColor: '#0b5ed7',
        confirmButtonText: 'Aceptar',
      });
      this.router.navigateByUrl(`/contratos/${usuarioEncontrado.tipo}/${usuarioEncontrado.id}`);
      

    } else {
      // Credenciales inválidas
      console.log("Credenciales inválidas");
      Swal.fire({
        icon: 'error',
        title: 'Incorrecto',
        text: 'Credenciales inválidas.',
        confirmButtonColor: '#0b5ed7',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  mostrarPassword() {
    this.showPassword = !this.showPassword;
  }
}

