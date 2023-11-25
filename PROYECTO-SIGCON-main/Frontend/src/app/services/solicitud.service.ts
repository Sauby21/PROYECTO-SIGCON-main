import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  nroSolicitud: string = "";
  nombreSolicitante: string = "";
  fechaSolicitud: string = "";
  predio: string = "";
  areaPredio: string = "";
  numeroCasas: string = "";
  cantAreasComunes: string = "";
  areaAreasComunes: string = "";
  servicio: string = "";
  cant_vigilantes: string = "";
  cant_plimpieza: string = "";
  cant_administracion: string = "";
  cant_jardineria: string = "";
  areasComunes: any[] = [];
  
  constructor() { }

  agregarAreaComun(areaComun: any) {
    this.areasComunes.push(areaComun);
  }

  reiniciarSolicitud(){
    this.nroSolicitud = "";
    this.nombreSolicitante = "";
    this.fechaSolicitud = "";
    this.predio = "";
    this.areaPredio = "";
    this.numeroCasas = "";
    this.cantAreasComunes = "";
    this.areaAreasComunes = "";
    this.servicio = "";
    this.cant_vigilantes = "";
    this.cant_plimpieza = "";
    this.cant_administracion = "";
    this.cant_jardineria = "";
    this.areasComunes = [];
    
  }
}
