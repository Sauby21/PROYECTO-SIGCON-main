import { Component, OnChanges, OnDestroy, OnInit,Input,Pipe, SimpleChanges} from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/services/conexion.service';
import { ActivatedRoute,Router,Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})


export class CotizacionComponent implements OnInit, OnChanges, OnDestroy{

  suscription: Subscription;
  //VARIABLES LOCALES
  Data:any;
  importe_administrador:any;
  importe_personallimp:any;
  importe_jardineros:any;
  importe_vigilantes:any;
  importe_total:any;
  TipoPredio = {
    nombre:''
  };
  Predio = {
    descripcion: '',
    direccion:'',
    ruc:'',
  };
  Solicitante = {
    nombrecompleto:'',
    correo:'',
    ndocumento:''
  };
  Persona = {
    nrodoc:''
  };
  Rol = {
    descripcion:''
  };
  Servicio = {
    descripcion:'',
    precio:0
  };
  Solicitud = {
    id_solicitud: 0,
    id_predio: 0,
    id_solicitante: 0,
    id_servicio: 0,
    area_predio: 0,
    num_casas: 0,
    cant_acomunes: 0,
    area_acomunes: 0,
    cant_vigilantes: 0,
    cant_plimpieza: 0,
    cant_administracion: 0,
    cant_jardineria: 0,
    fecha_solicitud: ''
  };

  constructor(private conexion: ConexionService ,private aroute:ActivatedRoute, private route:Router, private cdr: ChangeDetectorRef){
    

    this.suscription = conexion.refresh$.subscribe(()=>{
       
    });
    

  }

  id_solicitud:any;
  nombre_completo:any;

  ngOnInit(): void {
    this.id_solicitud = this.aroute.snapshot.paramMap.get('id_solicitud');
    //INNECESARIO - SOLO USO EL ID JIJIJIJIJIJIJIJIJIJIJI
    //this.nombre_completo = this.aroute.snapshot.paramMap.get('nombre_completo'); 
    this.CotizarVer(this.id_solicitud);
    console.log(this.id_solicitud);
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Obervable cerrado');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  //JIJIJIJIJIJIJIJIJIJIJIJIJIIJIJIJIJIJIJIJIJIJI
  CotizarVer(id_sol:any) {
    this.conexion.getCotizar(id_sol).subscribe((res: any) => {
    //RECIBE
    this.Data = res['data'];
    this.Solicitud.id_solicitud = this.Data.id_solicitud;
    //SOLICITANTE
    this.Solicitante.nombrecompleto = this.Data.solicitante.persona.nombre_completo;
    this.Solicitante.ndocumento = this.Data.solicitante.persona.ndocumento;
    this.Rol.descripcion = this.Data.solicitante.rol.descripcion;
    this.Solicitante.correo = this.Data.solicitante.correo;
    //INFO PREDIO
    this.Predio.descripcion= this.Data.predio.descripcion;
    this.Predio.direccion= this.Data.predio.direccion;
    this.TipoPredio.nombre= this.Data.predio.tipo_predio.nomre_predio;
    this.Predio.ruc= this.Data.predio.ruc;
    //SERVICIO
    this.Solicitud.cant_administracion= this.Data.cant_administracion;
    this.Solicitud.cant_plimpieza= this.Data.cant_plimpieza;
    this.Solicitud.cant_jardineria= this.Data.cant_jardineria;
    this.Solicitud.cant_vigilantes= this.Data.cant_vigilantes;
    this.Servicio.descripcion= this.Data.servicio.descripcion;

    //CALCULO COTIZACION

    this.importe_administrador= this.Data.cant_administracion*500;
    this.importe_personallimp= this.Data.cant_plimpieza*300;
    this.importe_jardineros= this.Data.cant_jardineria*300;
    this.importe_vigilantes= this.Data.cant_vigilantes*400;
    this.importe_total= this.importe_administrador + this.importe_personallimp + this.importe_jardineros+ this.importe_vigilantes;
    //PRUEBA
    console.log(this.Solicitud.id_solicitud);
    console.log(this.Solicitante.nombrecompleto);
    //console.log(id_sol);
    console.log('EDUARDO MMWB');

    //PUEDE QUE TE SIRVA
    //this.id_solicitud.emit(this.Solicitud.id_solicitud);
    //this.nombre_completo.emit(this.Solicitante.nombrecompleto);
    //this.route.navigate(['/seguimiento/cotizacion',this.Solicitud.id_solicitud]);

    });
  }
  
}
