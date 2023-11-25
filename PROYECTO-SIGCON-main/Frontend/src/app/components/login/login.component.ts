import { Component } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { NombreUsuarioService } from 'src/app/services/nombre-usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = "";
  password: string = "";

  personas: any;
  solicitantes: any;

  showPassword: boolean = false;

  constructor(private conexion: ConexionService, private router: Router,private usuarioService: NombreUsuarioService) {}

  ngOnInit(): void {
    
    this.conexion.getSolicitante().subscribe((res: any) => {
      this.solicitantes = res['data'];

    });

    this.conexion.getPersona().subscribe((res: any) => {
      this.personas = res['data'];

    });
  }

  login(): void {
    const personaEncontrado = this.personas.find((persona: { ndocumento: string}) => 
      persona.ndocumento === this.password);

    console.log(personaEncontrado);
    if (personaEncontrado){
      const solicitanteEncontrado = this.solicitantes.find((solicitante: { id_rol: number; correo: string; id_persona: number}) => 
      solicitante.id_rol === 1 && solicitante.id_persona === personaEncontrado.id_persona && solicitante.correo === this.correo);

      console.log(solicitanteEncontrado);
      if (solicitanteEncontrado) {
        // Inicio de sesión exitoso
        console.log("Inicio de sesión exitoso");
        console.log(personaEncontrado.nombres)
        this.usuarioService.nombreUsuario = personaEncontrado.nombres;
        this.usuarioService.id = solicitanteEncontrado.id_solicitante;
        this.usuarioService.apellido1 = personaEncontrado.apellido_paterno;
        this.usuarioService.apellido2 = personaEncontrado.apellido_materno;
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Inicio de sesión exitoso.',
          confirmButtonColor: '#0b5ed7',
          confirmButtonText: 'Aceptar',
        });
        this.router.navigateByUrl('/pagina1');
  
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
    else{
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

  registrarse(): void{
    this.router.navigateByUrl('/registro');
  }
  //para agregar el ojito a la contrasenia
  mostrarPassword() {
    this.showPassword = !this.showPassword;
  }


  
}
