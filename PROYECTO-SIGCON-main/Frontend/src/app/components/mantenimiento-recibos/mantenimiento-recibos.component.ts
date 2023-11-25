import { Component, OnInit} from '@angular/core';

//MODELOS
import { Predio } from '../../models/predio'
import { Gastos } from '../../models/gastos'
import { Casas } from '../../models/casas';
import { RegistroPredioEstado } from '../../models/registro-predio-estado';
import { RegistroCasaEstado } from '../../models/registro-casa-estado';

//SERVICIO BACKEND
import { ConexionService } from '../../services/conexion.service';

@Component({
  selector: 'app-mantenimiento-recibos',
  templateUrl: './mantenimiento-recibos.component.html',
  styleUrls: ['./mantenimiento-recibos.component.css']
})
export class MantenimientoRecibosComponent implements OnInit{

  constructor(private connBackend: ConexionService) { }        //Constructor | Servicio Backend

  //VARIABLES DEL PREDIO
  predioArray: Array<Predio> = new Array<Predio>();      //Array | Todos los predios
  filteredPredios: Array<Predio> = new Array<Predio>();      //Array | Predios filtrados
  searchPredios: string = '';                              //Texto | Filtro de predios
  selectedTextPredio: string = '--seleccione--';                //Texto | Predio seleccionado
  nomPresidente: string = '--seleccione un predio--';      //Texto | Presidente de predio seleccionado
  id_selectedPredio = '';


  //VARIABLES DEL PERIODO
  gastoArray: Array<Gastos> = new Array<Gastos>();      //Array | Todos los periodos de gasto
  filteredPeriodos: Array<Gastos> = new Array<Gastos>();      //Array | Periodos filtrados
  searchPeriodos: string = '';                              //Texto | Filtro de periodo
  selectedTextPeriodo: string = '--seleccione--';                //Texto | Periodo seleccionado
  id_selectedPeriodo = '';


  //VARIABLES DE CASAS
  casasArray: Array<Casas> = new Array<Casas>();        //Array | Todas las casas de un predio


  //COLORES Y SOMBRAS DE COMPONENTES
  finalizadoColor = getComputedStyle(document.documentElement).getPropertyValue('--finalizado-color');
  no_finalizadoColor = getComputedStyle(document.documentElement).getPropertyValue('--no-finalizado-color');
  finalizadoSombra = getComputedStyle(document.documentElement).getPropertyValue('--box-shadow-finalizado');
  no_finalizadoSombra = getComputedStyle(document.documentElement).getPropertyValue('--box-shadow-no-finalizado');


  //SELECCIONABLE
  isActivePeriodo: boolean = false;
  isActivePredios: boolean = false;


  //REGISTRO DE GASTOS DE PREDIOS Y CASAS
  mostrarComp_RegistGastPredios: boolean = false;
  mostrarComp_RegistGastCasa: boolean = false;


  //ESTADO DE BOTONES Y CBO
  bloquearPredios: boolean = false;
  bloquearPeriodos: boolean = false;
  bloquearRegistrarPredio: boolean = false;
  bloquearRegistrarCasas: boolean = false;


  //ESTADOS DE REGISTRO LOCAL
  estadoRegistroPredioSelected: string = '';

  //ID_ESTADO FINALIZADO
  id_estadofinaliazado = '3';
  //ID_ESTADO NO FINALIZADO
  id_estadoNOfinaliazado = '4';
  //TABLAS TEMPORALES
  prediosEstadoArray: Array<RegistroPredioEstado> = new Array<RegistroPredioEstado>();

  casasEstadoArray: Array<RegistroCasaEstado> = new Array<RegistroCasaEstado>(
    new RegistroCasaEstado("1", "1", "20", "no finalizado", "Abr-23"),
    new RegistroCasaEstado("2", "2", "21", "no finalizado", "May-23"),
    new RegistroCasaEstado("3", "3", "22", "no finalizado", "Jun-23"),
    new RegistroCasaEstado("4", "4", "23", "no finalizado", "Abr-23"),
    new RegistroCasaEstado("5", "5", "24", "no finalizado", "May-23"),
    new RegistroCasaEstado("6", "6", "25", "no finalizado", "Jun-23"),
    new RegistroCasaEstado("7", "7", "26", "no finalizado", "Abr-23"),
    new RegistroCasaEstado("8", "8", "27", "no finalizado", "May-23"),
    new RegistroCasaEstado("9", "9", "28", "no finalizado", "Jun-23"),
    new RegistroCasaEstado("10", "10", "29", "no finalizado", "Abr-23")
  );



  //INICIO DEL COMPONENTE
  ngOnInit(): void {
    this.getPredios_BD();
    this.getRegistroPredioEstado_BD();
  }

  asignarEstadoFinalizadoPredio() {
    if (this.verificarFinalizadoPredio()) {
      this.estadoRegistroPredioSelected = 'finalizado';
    } else {
      this.estadoRegistroPredioSelected = 'no finalizado';
    }
  }

  verificarFinalizadoPredio(): boolean {
    console.log("\nverificarFinalizadoPredio " +
      "\nthis.id_selectedPredio es:" + this.id_selectedPredio +
      "\nthis.id_selectedPredio es:" + this.selectedTextPeriodo
    )
    for (let i = 0; i < this.prediosEstadoArray.length; i++) {
      if (this.prediosEstadoArray[i].id_predio == this.id_selectedPredio
        && this.prediosEstadoArray[i].periodo == this.selectedTextPeriodo
        && this.prediosEstadoArray[i].descripcion == 'finalizado') {
        //ACA SE COLOCA el Método para modificar la tabla ESTADO_REGISTRO_PREDIO de la BD
        console.log("Se devuelve true en verificarFinalizadoPredio()")
        return true;
      }
    }
    return false;
  }

  //OPERACIONES DE LOS SELECCIONADORES (CBO) DE PREDIO Y PERIODO
  selectedPredio(item: Predio): void {
    this.toggleActivePredios();
    if (this.selectedTextPredio != item.predio) {
      this.selectedTextPredio = item.predio;
      this.nomPresidente = item.responsable;
      this.id_selectedPredio = item.id_predio;


      this.selectedTextPeriodo = '--seleccione--';
      this.id_selectedPeriodo = '';
      this.casasArray.splice(0, this.casasArray.length);
      this.predioArray.splice(0, this.casasArray.length);
      this.getCasas_BD(this.id_selectedPredio);
      this.getPeriodos_BD(item);

    }
    this.estadoRegistroPredioSelected = 'no finalizado';
  }

  selectedPeriodo(item: Gastos): void {
    this.toggleActivePeriodos();
    if (this.selectedTextPeriodo != item.periodo) {
      this.selectedTextPeriodo = item.periodo;
      this.id_selectedPeriodo = item.id_predio_gastos;
    }
    var existeEstado : boolean = false ;
    for (let i = 0; i < this.prediosEstadoArray.length; i++) {
      if (
        this.prediosEstadoArray[i].id_predio == this.id_selectedPredio
        && this.prediosEstadoArray[i].periodo == this.selectedTextPeriodo
      ) {
        existeEstado = true;
      } 
    }
    if(!existeEstado){
      console.log("No existe el registro predio de este predio y periodo, se crea en la bd");
      this.insertarRegistroPredioEstado_BD(this.id_selectedPredio,'1',this.id_estadoNOfinaliazado,this.selectedTextPeriodo);
    }
    this.getRegistroPredioEstado_BD();
    this.asignarEstadoFinalizadoPredio();
  }


  //FILTROS DE BÚSQUEDA
  filterPredios(): void {
    this.filteredPredios = this.predioArray.filter(predio => {
      const nombrePredio = predio.predio.split(' ').slice(1).join(' '); // Obtener solo el nombre del Predio
      return nombrePredio.toLowerCase().includes(this.searchPredios.toLowerCase());
    });
  }

  filterPeriodos(): void {   //PERMITE FILTRAR LOS PREDIOS CON LA BARRA DE BÚSQUEDA
    this.filteredPeriodos = this.gastoArray.filter(periodo => periodo.periodo.toLowerCase().startsWith(this.searchPeriodos.toLowerCase()))
  }


  //ACTIVE-DESACTIVE SELECTORES (CBO)
  toggleActivePredios(): void {
    this.isActivePredios = !this.isActivePredios;
  }

  toggleActivePeriodos(): void {   //PERMITE (PARA EL CBOX DE PREDIOS) ACTIVAR SI ESTÁ DESACTIVADO, DESACTIVAR SI ESTÁ ACTIVADO
    if (this.selectedTextPredio !== "--seleccione--") {
      this.isActivePeriodo = !this.isActivePeriodo;
    }
    else {
      alert('Seleccione un PREDIO antes de seleccionar alguno de los PERIODOS.');
    }
  }


  //CONTROLADORES DE REGISTROS DE GASTOS DE PREDIO Y CASA
  finalizarRegistroPredio() {
    for (let i = 0; i < this.prediosEstadoArray.length; i++) {
      if (
        this.prediosEstadoArray[i].id_predio == this.id_selectedPredio
        && this.prediosEstadoArray[i].periodo == this.selectedTextPeriodo
      ) {
        //ACA SE COLOCA el Metodo para modificar la tabla REGISTRO_CASA_ESTADO de la BD  
        this.editarRegistroPredioEstado_BD(this.id_estadofinaliazado, this.prediosEstadoArray[i].id_predio, this.prediosEstadoArray[i].periodo)
        this.prediosEstadoArray[i].descripcion = 'finalizado'
        this.asignarEstadoFinalizadoPredio();
        this.getRegistroPredioEstado_BD();
        //this.estadoRegistroPredioSelected='finalizado'
        break;
      }
    }


    this.getRegistroPredioEstado_BD();
  }

  cambiarMostrarRegistroPredio(item: boolean) {
    
    if (this.selectedTextPredio !== '--seleccione--') {
      if (this.selectedTextPeriodo !== '--seleccione--') {
        this.mostrarComp_RegistGastPredios = item;
        this.bloquearPredios = !this.bloquearPredios;
        this.bloquearPeriodos = !this.bloquearPeriodos;
        this.bloquearRegistrarPredio = !this.bloquearRegistrarPredio;
        this.bloquearRegistrarCasas = !this.bloquearRegistrarCasas;

        this.getRegistroPredioEstado_BD();
      }
      else {
        alert('Seleccione un PERIODO.');
      }
    }
    else {
      alert('Seleccione un PREDIO.');
    }
  }

  finalizarRegistroCasa(num_casa: string) {
    for (let i = 0; i < this.casasEstadoArray.length; i++) {
      if (this.casasEstadoArray[i].num_casa == num_casa
        && this.casasEstadoArray[i].periodo == this.selectedTextPeriodo) {
        this.casasEstadoArray[i].estado = 'finalizado';
        console.log("finalizarRegistroCasa() la participacionde la casa " + num_casa + " ahora es: " + this.casasEstadoArray[i].estado);
        //ACA SE COLOCA el Metodo para modificar la tabla REGISTRO_CASA_ESTADO de la BD

        break;
      }
    }
  }

  cambiarMostrarRegistroCasa(item: boolean) {
    if (this.selectedTextPredio !== '--seleccione--') {
      if (this.selectedTextPeriodo !== '--seleccione--') {
        this.mostrarComp_RegistGastCasa = item;
        this.bloquearPredios = !this.bloquearPredios;
        this.bloquearPeriodos = !this.bloquearPeriodos;
        this.bloquearRegistrarPredio = !this.bloquearRegistrarPredio;
        this.bloquearRegistrarCasas = !this.bloquearRegistrarCasas;
      }
      else {
        alert('Seleccione un PERIODO.');
      }
    }
    else {
      alert('Seleccione un PREDIO.');
    }
  }



  verificarFinalizadoCasas(num_casa: string): boolean {
    for (let i = 0; i < this.casasEstadoArray.length; i++) {
      if (this.casasEstadoArray[i].num_casa == num_casa
        && this.casasEstadoArray[i].periodo == this.selectedTextPeriodo
        && this.casasEstadoArray[i].estado == 'finalizado') {
        //ACA SE COLOCA el Método para modificar la tabla ESTADO_REGISTRO_PREDIO de la BD
        return true;
      }
    }
    return false;
  }


  //OBTENCIÓN DE DATOS MEDIANTE EL SERVICIO CONNBACKEND
  getPredios_BD(): void {
    this.connBackend.getPredios()
      .subscribe(data => {
        console.log(data)
        this.predioArray = data.predios;
        this.filteredPredios = this.predioArray;
      },
        error => console.log(error));
  }

  getPeriodos_BD(item: Predio): void {
    this.connBackend.getGastos(item.id_predio)
      .subscribe(data => {
        this.gastoArray = data.gastos;
        this.filteredPeriodos = this.gastoArray;
      },
        error => console.log(error));
  }

  getCasas_BD(id_predio: string): void {
    this.connBackend.getCasas(id_predio)
      .subscribe(
        data => {
          console.log(data)
          this.casasArray = data.casas;
          console.log(this.casasArray);
        },
        error => console.log(error));
  }

  getRegistroPredioEstado_BD(): void {
    this.connBackend.getRegistroPredioEstadoI()
      .subscribe(
        data => {
          console.log(data)
          console.log("actualiza el prediosEstadoArray")
          this.prediosEstadoArray = data.registros_predios_estados;
          console.log(this.prediosEstadoArray);
        },
        error => console.log(error));
  }

  editarRegistroPredioEstado_BD(id_estado: string, id_predio: string, periodo: string): void {
    console.log("putRegistroPredioEstado_BD datos enviados " + id_estado + " " + id_predio + " " + periodo)
    this.connBackend.putRegistroPredioEstado(id_estado, id_predio, periodo)
      .subscribe(data => { console.log(data) }, error => console.log(error));
    alert('Registro finalizado con exito!');

  }

  insertarRegistroPredioEstado_BD(id_predio: string, id_personal: string, id_estado: string, periodo: string) {
    this.connBackend.postRegistroPredioEstado(id_predio, id_personal, id_estado, periodo)
      .subscribe(data => { console.log(data) }, error => console.log(error));
  }
}
