import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  
  
  selectedDate: string = "";
  idSolicitante: string = "";
  tiposDocumento: any;
  ubigeo:any;
  forma!: FormGroup;

  constructor(private conexion: ConexionService, private router: Router, private fb: FormBuilder){
    this.crearFormulario();
  }

  ngOnInit(): void{
    this.conexion.getTipoDocumento().subscribe((res: any) =>{
      this.tiposDocumento = res['data'];
    });

    this.conexion.getUbigeo().subscribe((res: any) =>{
      this.ubigeo = res['data'];
    });
    this.obtenerIdSolicitante();
  }

  get tipoDocumentoNoValido(){
    return this.forma.get('tipoDocumento')?.invalid && this.forma.get('tipoDocumento')?.touched;
  }
  get numDocumentoNoValido(){
    return this.forma.get('numDocumento')?.invalid && this.forma.get('numDocumento')?.touched;
  }
  get telefonoNoValido(){
    return this.forma.get('telefono')?.invalid && this.forma.get('telefono')?.touched;
  }
  get nombresNoValido(){
    return this.forma.get('nombres')?.invalid && this.forma.get('nombres')?.touched;
  }
  get apellidoPaternoNoValido(){
    return this.forma.get('apellidoPaterno')?.invalid && this.forma.get('apellidoPaterno')?.touched;
  }
  get apellidoMaternoNoValido(){
    return this.forma.get('apellidoMaterno')?.invalid && this.forma.get('apellidoMaterno')?.touched;
  }
  get fechaNacimietnoNoValido(){
    return this.forma.get('fechaNacimietno')?.invalid && this.forma.get('fechaNacimietno')?.touched;
  }
  get codigoPostalNoValido(){
    return this.forma.get('codigoPostal')?.invalid && this.forma.get('codigoPostal')?.touched;
  }
  get direccionNoValido(){
    return this.forma.get('direccion')?.invalid && this.forma.get('direccion')?.touched;
  }
  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numDocumento: ['', [Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
      telefono: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimietno: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    });
  }

  registrar(){
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control =>{
        control.markAllAsTouched();
      })
    }else{
      this.guardarDatos();
    }
  }

  guardarDatos(): void{
    const tipoDocumento = (<HTMLInputElement>document.getElementById('tipoDocumento')).value;
    const nroDocumento = (<HTMLInputElement>document.getElementById('numDocumento')).value;
    const nombres = (<HTMLInputElement>document.getElementById('nombres')).value;
    const apellidoPaterno = (<HTMLInputElement>document.getElementById('apellidoPaterno')).value;
    const apellidoMaterno = (<HTMLInputElement>document.getElementById('apellidoMaterno')).value;
    const codigoPostal = (<HTMLInputElement>document.getElementById('codigoPostal')).value;
    const direccion = (<HTMLInputElement>document.getElementById('direccion')).value;
    const telefono = (<HTMLInputElement>document.getElementById('telefono')).value;
    const fechaNacimietno = (<HTMLInputElement>document.getElementById('fechaNacimietno')).value;
    const correo = (<HTMLInputElement>document.getElementById('correo')).value;
    
    const personaData = {
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      nombres: nombres,
      fecha_nacimiento: fechaNacimietno,
      id_tipo_documento: tipoDocumento,
      ndocumento: nroDocumento,
      direccion: direccion,
      idubigeo: codigoPostal
    };

    this.conexion.addPersona(personaData).subscribe((result: any) =>{
      console.log("Persona añadida correctamente:", result);

      this.obtenerIdSolicitante();

      const solicitanteData = {
        id_solicitante: this.idSolicitante,
        id_persona: result['data'].id_persona,
        id_rol: 1,
        telefono: telefono,
        correo: correo
      }

      this.conexion.addSolicitante(solicitanteData).subscribe((result: any) =>{
        console.log("Solicitante añadido correctamente:", result);
        alert("Registro Exitoso");
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error('Error al registrar al solicitante:', error);
        alert("Error de registro: " + error);
      });

    },
    (error) =>{
      console.error('Error al registrar a la persona:', error);
      alert("Error de registro: " + error);
    });

  }

  onDateChange(date: string) {
    // Hacer algo con la fecha seleccionada
    console.log(date);
  }

  volver(): void{
    this.router.navigateByUrl('/');
  }

  obtenerIdSolicitante(): void{
    this.conexion.getSolicitante().subscribe((res: any) =>{
      let maxId = 0;

      for (const solicitante of res['data']) {
        const id = Number(solicitante.id_solicitante);
        if (!isNaN(id) && id > maxId) {
        maxId = id;
      }
     }
      const id = maxId + 1;
      this.idSolicitante = id+"";
      console.log('IdSolicitante:', this.idSolicitante);
    });
  }
}
