import { Component,EventEmitter, Input, OnInit,Output } from '@angular/core';
import { TipoGastos } from 'src/app/models/tipo-gastos';
import { DescripGastos } from 'src/app/models/descrip-gastos';
import { ConexionService } from 'src/app/services/conexion.service';
import { Predio } from 'src/app/models/predio';
import { PredioGastosDet } from 'src/app/models/predio-gastos-det';

@Component({
  selector: 'app-registrar-gasto-predio',
  templateUrl: './registrar-gasto-predio.component.html',
  styleUrls: ['./registrar-gasto-predio.component.css']
})
export class RegistrarGastoPredioComponent {

  constructor(private connBackend: ConexionService) { }

  tipoGastoArray:             Array<TipoGastos> = new Array<TipoGastos>();
  selectedItemTipoGasto:      string = '--seleccione--';
  isActiveTipoGasto:          boolean = false;

  descripGastoArray:          Array<DescripGastos> = new Array<DescripGastos>();
  selectedItemDescripGasto:   string = '--seleccione--';
  isActiveDescripGasto:       boolean = false;

  id_predio: string =         '';
  id_periodo: string =        '';
  id_gasto: string =          '';
  periodo: string =           '';
  nombrePredio: string =      '';
  montoTotal: number =        0;
  botonUR =                   'Registrar';
  id_gasto_especifico: string = '';

  @Output() mostrarRegistroPredio_OUT = new EventEmitter<boolean>();
  @Output() llamarFinalizarPredio_OUT = new EventEmitter<string>();
  @Input() id_predio_IN:    string = "";
  @Input() id_periodo_IN:   string = "";
  @Input() predio_IN:       string = "";
  @Input() periodo_IN:      string = "";

  gastosRegistradosArray: PredioGastosDet[] = [];

  ngOnInit() {
    this.nombrePredio = this.predio_IN;
    this.periodo = this.periodo_IN;
    this.id_predio = this.id_predio_IN;
    this.id_periodo = this.id_periodo_IN;
    this.getTiposGastos_BD();
    this.getGastosDet_BD();
  }


  //SELECCIONABLES (CBO) TIPO DE GASTO
  selectedTipoGasto(item: TipoGastos): void {
    this.toggleActiveTipoGasto();
    if (this.selectedItemTipoGasto != item.descripcion) {
      this.selectedItemTipoGasto =      item.descripcion;
      this.selectedItemDescripGasto =   '--seleccione--';
      this.montoTotal =                 0;
      this.descripGastoArray.splice(0, this.descripGastoArray.length);
      this.botonUR = 'Registrar';
    }
    this.getDescripcionesGasto_BD(item.id_tipo_gasto);
  }

  selectedDescripGasto(item: DescripGastos): void {
    this.toggleActiveDescripGasto();
    if (this.selectedItemDescripGasto != item.descripcion) {
      this.montoTotal =                 0;
      this.selectedItemDescripGasto =   item.descripcion;
      this.id_gasto =                   item.id_gasto;
      this.botonUR = 'Registrar';
    }
  }


  //ACTIVAR Y DESACTIVAR CBO
  toggleActiveTipoGasto(): void {   //PERMITE (PARA EL CBOX DE TIPO GASTOS) ACTIVAR SI ESTÁ DESACTIVADO, DESACTIVAR SI ESTÁ ACTIVADO
    this.isActiveTipoGasto = !this.isActiveTipoGasto;
  }

  toggleActiveDescripGasto(): void {   //PERMITE (PARA EL CBOX DE DESCRIPCION) ACTIVAR SI ESTÁ DESACTIVADO, DESACTIVAR SI ESTÁ ACTIVADO
    if (this.selectedItemTipoGasto !== "--seleccione--") {
      this.isActiveDescripGasto = !this.isActiveDescripGasto;
    }
    else {
      alert('Seleccione un TIPO DE GASTO.');
    }
  }


  //REGISTRO DE GASTOS INDIVIDUALES DE LOS PREDIOS
  registrarGastoPredio() {
    if(this.botonUR === 'Registrar'){
      if(this.gastoRegistrado()){
        alert('Este gasto ya se encuentra registrado...');
      }
      else{
        this.connBackend.postGastosPredios(this.id_periodo, this.id_gasto, this.montoTotal.toString())
        .subscribe(data => { console.log(data) }, error => console.log(error));
        alert('Se ha registrado el gasto...');
        this.getGastosDet_BD();
      }
    }
    else{
      this.connBackend.putGastosPredios(this.id_gasto_especifico, this.montoTotal.toString())
      .subscribe(data => { console.log(data) }, error => console.log(error));
      alert('Se ha actualizado el gasto...');
      this.botonUR = 'Registrar';
      this.getGastosDet_BD();
    }
  }

  gastoRegistrado() {
    const gastoRegistrado01 = this.gastosRegistradosArray.filter((gasto) => gasto.id_gasto === this.id_gasto);
    if(gastoRegistrado01.length > 0){
      return true;
    }
    else{
      return false;
    }
  }


  //MUESTRA Y FINALIZACIÓN DE ASIGNAR GASTOS AL PREDIO
  set_mostrarRegistroPredio(item: boolean) {
    this.mostrarRegistroPredio_OUT.emit(item);
  }

  finalizarRegistroPredio() {
    this.set_mostrarRegistroPredio(false);
    this.llamarFinalizarPredio_OUT.emit();
  }


  //OBTENCIÓN DE DATOS MEDIANTE EL SERVICIO CONNBACKEND
  getTiposGastos_BD(): void {
    this.connBackend.getTipoGastos()
      .subscribe(data => {
        console.log(data)
        this.tipoGastoArray = data.tipoGastosComunes;
      },
        error => console.log(error));
  }

  getGastosDet_BD(): void {
    this.connBackend.getGastosPredios(this.id_periodo)
      .subscribe(data => {
        console.log(data)
        this.gastosRegistradosArray = data.gastoPredioDetalle;
      },
        error => console.log(error));
  }

  getDescripcionesGasto_BD(id_gasto_01: string): void {
    this.connBackend.getDescripGastos(id_gasto_01)
      .subscribe(data => {
        console.log(data)
        this.descripGastoArray = data.descripGastosComunes;
      },
        error => console.log(error));
  }


  //EDICIÓN DE GASTOS
  editarGasto(item: PredioGastosDet){
    this.getTiposGastos_BD();
    this.selectedItemTipoGasto = item.des_gasto;
    this.getDescripcionesGasto_BD(item.id_tipo_gasto.toString());
    this.selectedItemDescripGasto = item.descripcion;
    this.id_gasto = item.id_gasto;
    this.montoTotal = parseFloat(item.importe);
    this.id_gasto_especifico = item.id_predio_gastos_det;
    this.botonUR = 'Guardar';
  }

}
