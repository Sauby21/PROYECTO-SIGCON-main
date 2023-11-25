import { Component, OnChanges, OnDestroy, OnInit,Pipe, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/services/conexion.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-recaudacion',
  templateUrl: './recaudacion.component.html',
  styleUrls: ['./recaudacion.component.css']
})
export class RecaudacionComponent implements OnChanges, OnDestroy{
  
  filterPost = '';

  Recibo = {
    numRecibo: ''
  };
  Dato: any;
  importe: any;
  importeRec:any;
  estado: any;
  id_moneda: any;
  desc_moneda: any;
  cuentaPredio: any;
  recibo_id: any;
  cuenta_id: any;
  id_cuenta: any;
  n_operacion: any;
  fecha_operacion: any;
  recaudacion_estado: any;
  observacion: any;
  recaudaciones: any;
  registro_id_recaudacion:any;
  registro_nro_operacion: any;
  registro_fecha: any;
  registro_importe: any;
  registro_estado: any;
  registro_observacion: any;

  Recaudacion = {
    id_cuenta:0,
    id_mant_recibo: 0,
    n_operacion: 0,
    fecha_operacion: '',
    id_tipo_moneda: 0,
    importe: 0,
    id_recaudacion_estado: 0,
    id_cuenta_predio: 0,
    observacion: ''
  };

  edicionRecaudacion = {
    fecha_operacion: '',
    id_recaudacion_estado: 0,
    observacion:''
  }

  lim_num_recibo:any;
  lim_estado:any;
  lim_importe:any;
  lim_n_operaciom:any;
  lim_fecha:any;
  lim_moneda:any;
  lim_importerec:any;
  lim_recaudacion:any;

  public page!: number;

  suscription: Subscription;



  constructor(private conexion: ConexionService){
    conexion.getRecaudaciones().subscribe((res:any)=>{
      this.recaudaciones = res['data'];
      console.log(this.recaudaciones);
    })
    this.suscription = conexion.refresh$.subscribe(()=>{
      conexion.getRecaudaciones().subscribe((res:any)=>{
        this.recaudaciones = res['data'];
        console.log(this.recaudaciones);
      })      
    })
  }
  // ngOnInit(): void {}
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Obervable cerrado');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  buscarRecibo(){
    this.conexion.getBuscarRecibo(this.Recibo.numRecibo).subscribe((res: any) => {
      this.Dato = res['data'];
      this.importe = this.Dato.importe;
      this.importeRec = this.importe
      this.recibo_id = this.Dato.id_mant_recibo;
      this.Dato = res['estado'];
      this.estado = this.Dato;
      this.Dato = res['cuenta-id'];
      this.cuenta_id = this.Dato;
      this.Dato = res['id_tipo'];
      this.id_moneda = this.Dato;
      this.Dato = res['desc_tipo'];
      this.desc_moneda = this.Dato;
      this.Dato = res['cuenta-predio'];
      this.cuentaPredio = this.Dato;
    })
  }


  RegistrarRecaudacion(){
    this.Recaudacion.id_cuenta = this.cuenta_id;
    this.Recaudacion.id_mant_recibo = this.recibo_id;
    this.Recaudacion.id_cuenta_predio = this.cuentaPredio;
    this.Recaudacion.n_operacion = this.n_operacion;
    this.Recaudacion.fecha_operacion = this.fecha_operacion;
    this.Recaudacion.observacion = this.observacion;
    this.Recaudacion.id_tipo_moneda = this.id_moneda;
    this.Recaudacion.importe = this.importeRec;


    if(this.recaudacion_estado == "Validado"){
      this.Recaudacion.id_recaudacion_estado = 1;
    }else if(this.recaudacion_estado == "Rechazado"){
      this.Recaudacion.id_recaudacion_estado = 2;
    }else if(this.recaudacion_estado == "Anulado"){
      this.Recaudacion.id_recaudacion_estado = 3;
    }else{
      this.Recaudacion.id_recaudacion_estado = 4;
    }

    this.conexion.addRecaudacion(this.Recaudacion).subscribe((res: any) => {
      console.log("Recaudacion añadida correctamente: ",res);
      this.limpiarForms();
    });
    Swal.fire({
      icon: "info",
      title: "En Proceso..!",
      showConfirmButton: false,
      timer: 8000
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Este código se ejecuta cuando el temporizador se completa
        Swal.fire({
          icon: "success",
          title: "¡Registro Completado!",
          showConfirmButton: true
        });
      }
    });

  }

  editarRecaudacion(idRecaudacion: number){
    this.edicionRecaudacion.fecha_operacion = this.registro_fecha;
    if(this.registro_estado == "Validado"){
      this.edicionRecaudacion.id_recaudacion_estado = 1;
    }else if(this.registro_estado == "Rechazado"){
      this.edicionRecaudacion.id_recaudacion_estado = 2;
    }else if(this.registro_estado == "Anulado"){
      this.edicionRecaudacion.id_recaudacion_estado = 3;
    }else{
      this.edicionRecaudacion.id_recaudacion_estado = 4;
    }
    this.edicionRecaudacion.observacion = this.registro_observacion;
    this.conexion.updateRecaudacion(idRecaudacion,this.edicionRecaudacion).subscribe((res: any)=>{
      console.log("Recaudacion ha sido actualizado correctametne: ",res);
    })
    Swal.fire({
      icon: "info",
      title: "En Proceso..!",
      showConfirmButton: false,
      timer: 8000
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Este código se ejecuta cuando el temporizador se completa
        Swal.fire({
          icon: "success",
          title: "¡Actualizacion Completada!",
          showConfirmButton: true
        });
      }
    });
  }
  eliminarRecaudacion(idRecaudacion: any){
    console.log(idRecaudacion);
    this.conexion.deleteRecaudacion(idRecaudacion).subscribe((res:any) =>{
      console.log("Recaudacion ha sido eliminada correctamente: ",res);
    })
    Swal.fire({
      icon: "info",
      title: "En Proceso..!",
      showConfirmButton: false,
      timer: 4500
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Este código se ejecuta cuando el temporizador se completa
        Swal.fire({
          icon: "success",
          title: "¡Eliminacion Completada!",
          showConfirmButton: true
        });
      }
    });
    
  }

  Registros(recaudacion_:any){

    console.log(recaudacion_);
    this.registro_id_recaudacion=recaudacion_.id_recaudacion;
    this.registro_nro_operacion = recaudacion_.n_operacion;
    this.registro_fecha = recaudacion_.fecha_operacion;
    this.registro_importe= recaudacion_.importe;
    this.registro_estado = recaudacion_.recaudacion_estado.descripcion;
    this.registro_observacion = recaudacion_.observacion;
  }

  limpiarForms(){
    this.Recibo.numRecibo = "";
    this.estado = "";
    this.importe= "";
    this.n_operacion="";
    this.fecha_operacion="";
    this.desc_moneda="";
    this.importeRec="";
    this.recaudacion_estado="";
  }

}
