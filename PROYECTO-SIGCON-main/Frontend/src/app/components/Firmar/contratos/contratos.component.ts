import { Component, OnChanges, OnDestroy, OnInit,Pipe, SimpleChanges,Output, EventEmitter} from '@angular/core';
import { ContratoService } from 'src/app/services/auth/contrato.service';
import { ActivatedRoute,Router,Params} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  @Output() id_solicitud: EventEmitter<any> = new EventEmitter<any>();
  @Output() nombre_completo: EventEmitter<any> = new EventEmitter<any>();
  Data:any;
 
  page: number=1;
  count: number=0;
  tablesize: number=10;
  tablesizes: any=[5,10,15,20];
  suscription: Subscription;
  
  tipo:any; 
  id:any; 
  idSolicitudCotizacion:any;
  contratos: any = {
  

  }; // Objeto para almacenar los datos obtenidos

  mostrarCrearTab: boolean = false;
  mostrarPendientesTab: boolean = false;
  mostrarRegistradosTab: boolean = false;

  cotizaciones: any[] = [];
  contratosPendientes: any[] = [];
  contratosRegistrados: any[] = [];

  constructor(private contratoService: ContratoService, private aroute:ActivatedRoute, private route:Router, private cdr: ChangeDetectorRef){
    

    this.suscription = contratoService.refresh$.subscribe(()=>{
       
    });
    

  }
  
  ngOnInit(): void {
    this.tipo = this.aroute.snapshot.paramMap.get('tipo');
    this.id = this.aroute.snapshot.paramMap.get('id');
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
    this.contratoService.contratos(this.tipo, this.id).subscribe(
      (data) => {
        this.cotizaciones = data.cotizaciones;
        console.log('Datos de cotizaciones:', this.cotizaciones);
        // Manipula los datos de cotizaciones aquí según necesites
      },
      (error) => {
        console.error('Error al obtener cotizaciones:', error);
      }
    );   
    this.contratoService.contratos(this.tipo, this.id).subscribe(
      (data) => {
        this.contratosPendientes = data.contratos_pendientes;
        console.log('Datos de contratos pendientes:', this.contratosPendientes);
        // Manipula los datos de contratos pendientes aquí según necesites
      },
      (error) => {
        console.error('Error al obtener contratos pendientes:', error);
      }
    );
    this.contratoService.contratos(this.tipo, this.id).subscribe(
      (data) => {
        this.contratosRegistrados = data.contratos_registrados;
        console.log('Datos de contratos registrados:', this.contratosRegistrados);
        // Manipula los datos de contratos registrados aquí según necesites
      },
      (error) => {
        console.error('Error al obtener contratos registrados:', error);
      }
    );
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

}