import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';
import { PredioService } from 'src/app/services/predio.service';
import { Subscription } from 'rxjs';
import { NombreUsuarioService } from 'src/app/services/nombre-usuario.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'popper.js';
import 'bootstrap-select';
import Swal from 'sweetalert2';
import * as $ from 'jquery';



@Component({
  selector: 'app-solicitar-cotizacion',
  templateUrl: './solicitar-cotizacion.component.html',
  styleUrls: ['./solicitar-cotizacion.component.css']
})
export class SolicitarCotizacionComponent {
  
  idSolicitante: string = "";
  nombreSolicitante: string = "";
  ap_paterno: string = "";
  ap_materno: string = "";
  idServicio: string  = "";
  predio: any;
  solicitud: any;
  servicios: any;
  areasComunes: any;
  predioAreasComunes: any;
  forma!: FormGroup;

  @Input() idPredio: string = "";
  @Input() nombrePredio: string = "";
  private idPredioSubscription: Subscription = new Subscription();

  editarNombre: boolean = true;

  cantAreas: number = 0;
  cAdmin: number = 0;
  cJardineria: number = 0;
  cLimpieza: number = 0;
  cSegur: number = 0;

  dAdmin: boolean = true;
  dSegur: boolean = true;
  dLimpieza: boolean = true;
  dJardineria: boolean = true;

  dAreasComunes: boolean = false;

  constructor(private conexion:ConexionService, private router: Router, private predioService: PredioService, private usuarioservice: NombreUsuarioService, private solicitudService: SolicitudService, private fb: FormBuilder){
    this.idSolicitante = usuarioservice.id;
    this.nombreSolicitante = usuarioservice.nombreUsuario;
    this.ap_paterno = usuarioservice.apellido1;
    this.ap_materno = usuarioservice.apellido2;
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.conexion.getPredio().subscribe((res: any) => {
      this.predio = res['data'];
    });
  
    this.conexion.getServicio().subscribe((res: any) => {
      this.servicios = res['data'];
    });
  
    this.conexion.getAreaComun().subscribe((res: any) => {
      this.areasComunes = res['data'];
    });
  
    this.conexion.getPredioAreaComun().subscribe((res: any) => {
      this.predioAreasComunes = res['data'];
    });
  
    this.idPredioSubscription = this.predioService.idPredio$.subscribe((idPredio) => {
      if (idPredio) {
        this.idPredio = idPredio;
        this.cargarAreasComunes(idPredio);
      }
    }, (error) => {
      console.error('Error subscribing to idPredio$', error);
    });
  
    this.idPredioSubscription.add(this.predioService.nombrePredio$.subscribe((nombrePredio) => {
      this.nombrePredio = nombrePredio;
    }, (error) => {
      console.error('Error subscribing to nombrePredio$', error);
    }));
  }

  ngOnDestroy(): void {
    this.idPredioSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    
    $(document).ready(() => {
      $('.selectpicker').selectpicker();
    });
  }

  get predioNoValido(){
    return this.forma.get('predio')?.invalid && this.forma.get('predio')?.touched;
  }
  get areaPredioNoValido(){
    return this.forma.get('areaPredio')?.invalid && this.forma.get('areaPredio')?.touched;
  }
  get numeroCasasNoValido(){
    return this.forma.get('numeroCasas')?.invalid && this.forma.get('numeroCasas')?.touched;
  }
  get tipoAreaComunNoValido(){
    return this.forma.get('tipoAreaComun')?.invalid && this.forma.get('tipoAreaComun')?.touched;
  }
  get areaAreaComunNoValido(){
    return this.forma.get('areaAreaComun')?.invalid && this.forma.get('areaAreaComun')?.touched;
  }
  get tipoServicioNoValido(){
    return this.forma.get('tipoServicio')?.invalid && this.forma.get('tipoServicio')?.touched;
  }
  get administracionNoValido(){
    return this.forma.get('administracion')?.invalid && this.forma.get('administracion')?.touched;
  }
  get limpiezaNoValido(){
    return this.forma.get('limpieza')?.invalid && this.forma.get('limpieza')?.touched;
  }
  get seguridadNoValido(){
    return this.forma.get('seguridad')?.invalid && this.forma.get('seguridad')?.touched;
  }
  get jardineriaNoValido(){
    return this.forma.get('jardineria')?.invalid && this.forma.get('jardineria')?.touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      //predio: [{value:'', disabled:false}, Validators.required],
      areaPredio: [{value:'', disabled:false}, [Validators.required, Validators.pattern('^[0-9]+$')]],
      numeroCasas: [{value:'0', disabled:false}, [Validators.required, Validators.pattern('^[0-9]+$')]],
      //tipoAreaComun: [{value:'', disabled:false}, Validators.required],
      //areaAreaComun: [{value:'', disabled:false}, [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoServicio: [{value:'0', disabled:false}, Validators.required],
      //administracion: [{value:this.cAdmin, disabled:this.dAdmin}, [Validators.required, Validators.pattern('^[0-9]+$')]],
      //limpieza: [{value:this.cLimpieza, disabled:this.dLimpieza}, [Validators.required, Validators.pattern('^[0-9]+$')]],
      //seguridad: [{value:this.cSegur, disabled:this.dSegur}, [Validators.required, Validators.pattern('^[0-9]+$')]],
      //jardineria: [{value:this.cJardineria, disabled:this.dJardineria}, [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  seleccionarServicio(): void{
    this.idServicio = (<HTMLInputElement>document.getElementById('servicio')).value;
    console.log('Servicio seleccionado', this.idServicio);
    
    if(this.idServicio == "1"){
      this.cAdmin = 1;
      this.cJardineria = 0;
      this.cLimpieza = 0;
      this.cSegur = 0;

      this.dAdmin = true;
    }else if(this.idServicio == "2"){
      this.cAdmin = 0;
      this.cJardineria = 0;
      this.cLimpieza = 0;
      this.cSegur = 0;

    }else if(this.idServicio == "3"){
      this.cAdmin = 0;
      this.cJardineria = 0;
      this.cLimpieza = 0;
      this.cSegur = 0;

    }else if(this.idServicio == "4"){
      this.cAdmin = 0;
      this.cJardineria = 0;
      this.cLimpieza = 0;
      this.cSegur = 0;

    }
  }

  cargarAreasComunes(idPredio: String){
    const aAreasComunes = this.predioAreasComunes.filter((ac: any) => 
      ac.id_predio === idPredio);
      console.log("Areas comunes: ", aAreasComunes);

      this.eliminarTodoAreaComun();

      for(let i=0; i<aAreasComunes.length; i++){
        this.agregarElementoAreaComun(aAreasComunes[i].id_area_comun, aAreasComunes[i].area, true);
      }

      if(aAreasComunes.length > 0){
        this.dAreasComunes = true;
      }else{
        this.dAreasComunes = false;
      }
  }

  eliminarTodoAreaComun(){
    const cant = this.cantAreas;
    for(let j=0; j<cant; j++){
      this.eliminarElementoAreaComun();
    }
  }

  eNombre(){
    this.editarNombre = !this.editarNombre;
  }

  agregarElementoAreaComun(valor: string, area: String, dis: boolean) {
    const scrollarea = document.querySelector('.scrollareaAC') as HTMLElement;
  
    const newRow = document.createElement('div');
    newRow.className = 'row g-3';
  
    let options = '';
    for (const ac of this.areasComunes) {
      // Verificar si el valor del elemento actual coincide con el valor deseado
      const isSelected = ac.id_area_comun === valor ? 'selected' : '';
      options += `<option value="${ac.id_area_comun}" ${isSelected}>${ac.descripcion}</option>`;
    }

    console.log(dis);

    var disabled = '';
    if(dis){
      disabled = 'disabled';
    }

    newRow.innerHTML = `
      <div class="col-7 form-group mb-4">
        <label for="tipoAreaComun">Tipo área común:</label>
        <select class="form-control form-select" id="tipoAreaComun" ${disabled} required>
          ${options}
        </select>
      </div>
      <div class="col-5 form-group mb-4">
        <label for="areaAreaComun">Área (m^2):</label>
        <input type="text" class="form-control" id="areaAreaComun" value="${area}" ${disabled} required>
      </div>
    `;
  
    scrollarea.appendChild(newRow);
    this.cantAreas = this.cantAreas + 1;
  }

  eliminarElementoAreaComun() {
    const rows = document.querySelectorAll('.scrollareaAC .row');
    if (rows.length > 0) {
      rows[rows.length - 1].remove();
      this.cantAreas = this.cantAreas - 1;
    }
  }


  registrar() {
    if (this.idSolicitante == "" || this.idSolicitante == "-1") {
      alert("Solicitante desconocido");
    } else if (this.idPredio == "-1" || this.idPredio == "") {
      alert("Seleccione o registre un predio antes de realizar una solicitud");
    } else if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      (async () => {
        const confirmacion = await Swal.fire({
          title: 'Seguro?',
          text: "¿Está seguro de solicitar la cotización?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0b5ed7',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        });
  
        if (confirmacion.isConfirmed) {
          this.guardarDatos();
        }
      })()
    }
  }


  guardarDatos(){
    this.solicitudService.reiniciarSolicitud();
    //Elementos del forms
    const idServicio = (<HTMLInputElement>document.getElementById('servicio')).value;

    const sevicios = (<HTMLSelectElement>document.getElementById('servicio'));
    const selectedOption = sevicios.selectedOptions[0];
    const nombreServicio = selectedOption.textContent;

    const areaPredio = (<HTMLInputElement>document.getElementById('areaPredio')).value;
    const numeroCasas = (<HTMLInputElement>document.getElementById('numeroCasas')).value;
    
    const areasAreasComunesInput = document.querySelectorAll('#areaAreaComun');
    const areasAreasComunes = Array.from(areasAreasComunesInput).map((option) => (option as HTMLInputElement).value);
    let sumaAreas = 0;
    
    const tiposAreasComunesInput = document.querySelectorAll('#tipoAreaComun');
    const tiposAreasComunes = Array.from(tiposAreasComunesInput).map((option) => (option as HTMLInputElement).value);
    const nombresAreasComunes = Array.from(tiposAreasComunesInput).map((option) => (option as HTMLSelectElement).selectedOptions[0].textContent);

    for (let i=0; i<areasAreasComunes.length; i++){
      if(!this.dAreasComunes){
        const predioAreasComunesData = {
          id_predio: this.idPredio,
          id_area_comun: tiposAreasComunes[i],
          codigo: 111,
          area: areasAreasComunes[i]
        };
  
        this.conexion.addPredioAreaComun(predioAreasComunesData).subscribe(
          (result: any) =>{
            console.log("Área comun añadida correctamente:", result);
            const areaComun = {nombre: nombresAreasComunes[i], area: areasAreasComunes[i]};
            this.solicitudService.agregarAreaComun(areaComun);
          },
          (error) => {
            console.error('Error al registrar el área común:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al registrar el área común.',
              confirmButtonColor: '#0b5ed7',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }else{
        const areaComun = {nombre: nombresAreasComunes[i], area: areasAreasComunes[i]};
        this.solicitudService.agregarAreaComun(areaComun);
      }

      sumaAreas += parseFloat(areasAreasComunes[i]);
    }

    const jardineriaInput = document.getElementById('jardineria') as HTMLInputElement;
    const administracionInput = document.getElementById('administracion') as HTMLInputElement;
    const limpiezaInput = document.getElementById('limpieza') as HTMLInputElement;
    const seguridadInput = document.getElementById('seguridad') as HTMLInputElement;

    const jardineria = jardineriaInput?.value ?? '0';
    const administracion = administracionInput?.value ?? '0';
    const limpieza = limpiezaInput?.value ?? '0';
    const seguridad = seguridadInput?.value ?? '0';

    

    const nombreSolicitante = (<HTMLInputElement>document.getElementById('nombreSolicitante')).value;

    const fecha = new Date();
      

    const solicitudData = {
      id_predio: this.idPredio,
      id_solicitante: this.idSolicitante,
      id_servicio: idServicio,
      area_predio: areaPredio,
      num_casas: numeroCasas,
      cant_acomunes: this.cantAreas,
      area_acomunes: sumaAreas,
      cant_vigilantes: seguridad,
      cant_plimpieza: limpieza,
      cant_administracion: administracion,
      cant_jardineria: jardineria,
      fecha_solicitud: fecha,
      nombre_solicitante: nombreSolicitante,
    }

    this.conexion.addSolicitud(solicitudData).subscribe(
      (result: any) => {
        console.log('Solicitud de administracion hecha de forma correcta:', result);
        
        this.solicitudService.nroSolicitud = result['data'].id_solicitud;
        this.solicitudService.nombreSolicitante = nombreSolicitante;
        this.solicitudService.fechaSolicitud = result['data'].fecha_solicitud;
        this.solicitudService.predio = this.nombrePredio;
        this.solicitudService.areaPredio = areaPredio;
        this.solicitudService.numeroCasas = numeroCasas;
        this.solicitudService.cantAreasComunes = this.cantAreas+"";
        this.solicitudService.areaAreasComunes = sumaAreas+"";
        this.solicitudService.servicio = nombreServicio+"";
        this.solicitudService.cant_jardineria = jardineria;
        this.solicitudService.cant_plimpieza = limpieza;
        this.solicitudService.cant_vigilantes = seguridad;

        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Solicitud de administracion hecha de forma correcta.',
          confirmButtonColor: '#0b5ed7',
          confirmButtonText: 'Aceptar',
        });
        this.router.navigateByUrl('/formato-solicitud');
      },
      (error) => {
        console.error('Error al insertar la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar la solicitud de administracion.',
          confirmButtonColor: '#0b5ed7',
          confirmButtonText: 'Aceptar',
        });
      }
    );   
  }


  resetForm() {
    (<HTMLFormElement>document.querySelector('form')).reset();
  }

  volver(){
    this.router.navigateByUrl('/pagina1');
  }

}
