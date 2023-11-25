import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';
import { NombreUsuarioService } from 'src/app/services/nombre-usuario.service';
import { PredioService } from 'src/app/services/predio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-predio',
  templateUrl: './registrar-predio.component.html',
  styleUrls: ['./registrar-predio.component.css']
})
export class RegistrarPredioComponent {

  
  idPersona: string = "";
  predios: any;
  tiposPredio: any;
  ubigeo: any;
  lectura: boolean = true;
  buscar: boolean = false;
  iRegistro: boolean = false;
  autoCompletados: any;
  id_predio: string = "";
  predio: any;
  bRegistro: string = "Iniciar registro de predio";
  forma!: FormGroup;

  jQuery: any;

  constructor(private conexion:ConexionService, private router: Router, private predioService: PredioService, private usuarioService: NombreUsuarioService, private fb: FormBuilder){
    this.crearFormulario();
    this.idPersona = usuarioService.id;
  }

  ngOnInit(): void{
    this.conexion.getTipoPredio().subscribe((res: any) =>{
      this.tiposPredio = res['data'];
    })

    this.conexion.getUbigeo().subscribe((res: any) =>{
      this.ubigeo = res['data'];
    })

    this.conexion.getPredio().subscribe((res: any) =>{
      this.predios = res['data'];
      this.autoCompletados = this.predios;
      this.predio = this.predios.filter((res: any) => res.id_predio === this.id_predio);
    })
  }

  ngAfterViewInit() {
    
  }


  get nombrePredioNoValido(){
    return this.forma.get('nombrePredio')?.invalid && this.forma.get('nombrePredio')?.touched;
  }
  get numeroContactoNoValido(){
    return this.forma.get('numeroContacto')?.invalid && this.forma.get('numeroContacto')?.touched;
  }
  get rucNoValido(){
    return this.forma.get('ruc')?.invalid && this.forma.get('ruc')?.touched;
  }
  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }
  get tipoPredioNoValido(){
    return this.forma.get('tipoPredio')?.invalid && this.forma.get('tipoPredio')?.touched;
  }
  get direccionNoValido(){
    return this.forma.get('direccion')?.invalid && this.forma.get('direccion')?.touched;
  }
  get codigoPostalNoValido(){
    return this.forma.get('codigoPostal')?.invalid && this.forma.get('codigoPostal')?.touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombrePredio: [{value:'', disabled:this.lectura}, Validators.required],
      numeroContacto: [{value:'', disabled:this.lectura}, [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      ruc: [{value:'', disabled:this.lectura}, [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]],
      correo: [{value:'', disabled:this.lectura}, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      tipoPredio: [{value:'', disabled:this.lectura}, Validators.required],
      direccion: [{value:'', disabled:this.lectura}, Validators.required],
      codigoPostal: [{value:'', disabled:this.lectura}, Validators.required]
    });
  }

  crearFormularioLleno(nombrePredio: string, numeroContacto: string, ruc:string, correo: string, tipoPredio: string, direccion: string, codigoPostal: string){
    this.forma = this.fb.group({
      nombrePredio: [{value: nombrePredio, disabled:this.lectura}, Validators.required],
      numeroContacto: [{value: numeroContacto, disabled:this.lectura}, [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      ruc: [{value: ruc, disabled:this.lectura}, [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]],
      correo: [{value: correo, disabled:this.lectura}, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      tipoPredio: [{value: tipoPredio, disabled:this.lectura}, Validators.required],
      direccion: [{value: direccion, disabled:this.lectura}, Validators.required],
      codigoPostal: [{value: codigoPostal, disabled:this.lectura}, Validators.required]
    });
  }

  iniciarRegistro(){
    if(this.lectura){
      this.lectura = false;
      this.buscar = true;
      this.predio = { correo: "", descripcion: "", direccion: "", idubigeo: "", ruc: "", telefono: ""};
      this.bRegistro = "Cancelar registro";
      this.crearFormulario();
    }else{
      this.lectura = true;
      this.buscar = false;
      this.bRegistro = "Iniciar registro de predio";
      this.crearFormulario();
    }
    
    this.predioService.updateIdPredio("-1");
    this.predioService.updateNombrePredio("");

  }

  seleccionarOpcion(): void {
    console.log('Seleccionando predio', this.id_predio);

    this.predio = this.predios.filter(
      (resultado: any) => resultado.id_predio == this.id_predio
    )[0];
    console.log(this.predio);
    this.predioService.updateIdPredio(this.predio.id_predio);
    this.predioService.updateNombrePredio(this.predio.descripcion);
  }
  
  autoCompletar() {
    const textoBusqueda = (<HTMLInputElement>document.getElementById('buscarPredio')).value;
    this.autoCompletados = this.predios.filter(
      (resultado: any) => resultado.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
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

  guardarDatos(){
    //Elemntos de formulario
    const nombrePredio = (<HTMLInputElement>document.getElementById('nombrePredio')).value;
    const ruc = (<HTMLInputElement>document.getElementById('ruc')).value;
    const tipoPredio = (<HTMLInputElement>document.getElementById('tipoPredio')).value;
    const numeroContacto = (<HTMLInputElement>document.getElementById('numeroContacto')).value;
    const correoElectronico = (<HTMLInputElement>document.getElementById('correoElectronico')).value;
    const direccion = (<HTMLInputElement>document.getElementById('direccion')).value;
    const codigoPostal = (<HTMLInputElement>document.getElementById('codigoPostal')).value;
    alert(direccion + "," + codigoPostal);

    const predioData = {
      id_tipo_predio: tipoPredio,
      descripcion: nombrePredio,
      ruc: ruc,
      telefono: numeroContacto,
      correo: correoElectronico,
      direccion: direccion,
      idubigeo: codigoPostal,
      id_persona: this.idPersona
    }

    this.conexion.addPredio(predioData).subscribe(
      (predioNuevo: any) => {
        console.log('Predio insertado correctamente:', predioNuevo);
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Predio registrado con éxito.',
          confirmButtonColor: '#0b5ed7',
          confirmButtonText: 'Aceptar',
        });
        this.predioService.updateIdPredio(predioNuevo['data'].id_predio);
        this.predioService.updateNombrePredio(predioNuevo['data'].descripcion);
        this.terminarRegistro();
        this.crearFormularioLleno(nombrePredio, numeroContacto, ruc, correoElectronico, tipoPredio, direccion, codigoPostal);
      },
      (error) => {
        console.error('Error al insertar el predio:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar el predio.',
          confirmButtonColor: '#0b5ed7',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  terminarRegistro(){
    this.lectura = true;
    this.buscar = true;
    this.iRegistro = true;
  }
}
