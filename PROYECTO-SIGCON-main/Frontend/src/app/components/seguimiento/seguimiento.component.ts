import { Component, OnChanges, OnDestroy, OnInit,Pipe, SimpleChanges,Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { ConexionService } from 'src/app/services/conexion.service';
import { ActivatedRoute,Router} from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit, OnChanges, OnDestroy{
  
  @Output() id_solicitud: EventEmitter<any> = new EventEmitter<any>();
  @Output() nombre_completo: EventEmitter<any> = new EventEmitter<any>();
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
    correo:''
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
  solicitudes:any;
  cotizaciones:any;
  page: number=1;
  count: number=0;
  tablesize: number=10;
  tablesizes: any=[5,10,15,20];
  suscription: Subscription;
  constructor(private conexion: ConexionService , private route:Router,private aroute:ActivatedRoute){
    conexion.getSolicitudes().subscribe((res:any)=>{
      this.solicitudes = res['data_pendientes'];
      console.log(this.solicitudes);
    });
    conexion.getCotizaciones().subscribe((res:any)=>{
      this.cotizaciones = res['data_completadas'];
      console.log(this.cotizaciones);
    });
    this.suscription = conexion.refresh$.subscribe(()=>{
      conexion.getSolicitudes().subscribe((res:any)=>{
        this.solicitudes = res['data_pendientes'];
        console.log(this.solicitudes);
      });      
      conexion.getCotizaciones().subscribe((res:any)=>{
        this.cotizaciones = res['data_completadas'];
        console.log(this.cotizaciones);
      });  
    });
    
  }
  ngOnInit(): void {
    
    this.actualizarTabla();
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Obervable cerrado');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  onTableDataChanges(event:any){
    this.page=event;
    this.actualizarTabla();
  }
  onTableSizeChanges(event:any): void{
    this.tablesize = event.target.value;
    this.page=1;
    this.actualizarTabla();
  }
  actualizarTabla(){
    this.conexion.getSolicitudes().subscribe((res:any)=>{
      this.solicitudes = res['data_pendientes'];
      console.log(this.solicitudes);
    });   
    this.conexion.getCotizaciones().subscribe((res:any)=>{
      this.cotizaciones = res['data_completadas'];
      console.log(this.cotizaciones);
    }); 
  }
  formatear_id(id: any): string {
    const numeroStr: string = id.toString();
    const cerosRestantes: number = 6 - numeroStr.length;
    let numeroRelleno: string = "";
    if (cerosRestantes >= 0) {
        numeroRelleno = "0".repeat(cerosRestantes) + numeroStr;
    }
    return numeroRelleno;
  }
  Cotizar(id_sol:any) {
    this.conexion.getCotizar(id_sol).subscribe((res: any) => {
      
    this.Data = res['data'];
    //this.Solicitante.nombrecompleto = this.Data.solicitante.persona.nombre_completo;
    this.Solicitud.id_solicitud = this.Data.id_solicitud;
    this.Solicitante.nombrecompleto = this.Data.solicitante.persona.nombre_completo;
  
      // Navegación a la nueva URL
    console.log(this.Solicitud.id_solicitud);
    console.log(this.Solicitante.nombrecompleto);
    //console.log(id_sol);
    console.log('QUE ONDAAAAAAAAA');

    this.id_solicitud.emit(this.Solicitud.id_solicitud);
    this.nombre_completo.emit(this.Solicitante.nombrecompleto);
    this.route.navigate(['/SeguimientoCotizacion/cotizacion',this.Solicitud.id_solicitud]);

    });
  }
}
