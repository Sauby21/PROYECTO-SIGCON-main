import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  private BASE_URL = 'http://127.0.0.1:5000/'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
  getBuscarRecibo(n_recibo: any){
    const url = `http://127.0.0.1:5000/buscarRecibo/${n_recibo}`;
    return this.http.get(url);
  }
  getRecaudaciones(){
    const url = 'http://127.0.0.1:5000/BuscarRecaudacion';
    return this.http.get(url);
  }
  addRecaudacion(recaudacion: any){
    const url = 'http://127.0.0.1:5000/agregar';
    return this.http.post<any>(url,recaudacion)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    )  
  }
  updateRecaudacion(id_recaudacion: any,recaudacion:any){
    const url = `http://127.0.0.1:5000/editar/${id_recaudacion}`;
    return this.http.put<any>(url,recaudacion)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    ) 
  }
  deleteRecaudacion(id_recaudacion: any){
    const url = `http://127.0.0.1:5000/eliminar/${id_recaudacion}`;
    return this.http.delete<any>(url,id_recaudacion)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })
    ) 
  }

  getPersona() {
    const url = 'http://127.0.0.1:5000/persona';
    return this.http.get(url);
  }

  addPersona(persona: any) {
    const url = 'http://127.0.0.1:5000/persona';
    return this.http.post<number>(url, persona);
  }

  getRol() {
    const url = 'http://127.0.0.1:5000/rol';
    return this.http.get(url);
  }

  addRol(rol: any) {
    const url = 'http://127.0.0.1:5000/rol';
    return this.http.post<number>(url, rol);
  }

  getSolicitante() {
    const url = 'http://127.0.0.1:5000/solicitante';
    return this.http.get(url);
  }

  addSolicitante(solicitante: any) {
    const url = 'http://127.0.0.1:5000/solicitante';
    return this.http.post<number>(url, solicitante);
  }

  getSolicitud() {
    const url = 'http://127.0.0.1:5000/solicitud';
    return this.http.get(url);
  }

  addSolicitud(solicitud: any) {
    const url = 'http://127.0.0.1:5000/solicitud';
    return this.http.post<number>(url, solicitud);
  }

  getTipoDocumento() {
    const url = 'http://127.0.0.1:5000/tipo_documento';
    return this.http.get(url);
  }

  addTipoDocumento(tipoDocumento: any) {
    const url = 'http://127.0.0.1:5000/tipo_documento';
    return this.http.post<number>(url, tipoDocumento);
  }

  getPredio() {
    const url = 'http://127.0.0.1:5000/predio';
    return this.http.get(url);
  }

  addPredio(predio: any): Observable<any> {
    const url = 'http://127.0.0.1:5000/predio';
    return this.http.post<number>(url, predio);
  }


  getServicio() {
    const url = 'http://127.0.0.1:5000/servicio';
    return this.http.get(url);
  }

  addServicio(servicio: any) {
    const url = 'http://127.0.0.1:5000/servicio';
    return this.http.post<number>(url, servicio);
  }

  getTipoPredio() {
    const url = 'http://127.0.0.1:5000/tipo_predio';
    return this.http.get(url);
  }

  addTipoPredio(tipoPredio: any) {
    const url = 'http://127.0.0.1:5000/tipo_predio';
    return this.http.post<number>(url, tipoPredio);
  }

  getUbigeo() {
    const url = 'http://127.0.0.1:5000/ubigeo';
    return this.http.get(url);
  }

  addUbigeo(ubigeo: any) {
    const url = 'http://127.0.0.1:5000/ubigeo';
    return this.http.post<number>(url, ubigeo);
  }

  getAreaComun() {
    const url = 'http://127.0.0.1:5000/areaComun';
    return this.http.get(url);
  }

  addAreaComun(areaComun: any) {
    const url = 'http://127.0.0.1:5000/areaComun';
    return this.http.post<number>(url, areaComun);
  }

  getPredioAreaComun() {
    const url = 'http://127.0.0.1:5000//predio_area_comun';
    return this.http.get(url);
  }

  addPredioAreaComun(predioAreaComun: any) {
    const url = 'http://127.0.0.1:5000//predio_area_comun';
    return this.http.post<number>(url, predioAreaComun);
  }

  getSolicitudes(){
    const url = `http://127.0.0.1:5000/cotizaciones/cotizacionesp`;
    return this.http.get(url);
  }
  getCotizaciones(){
    const url = `http://127.0.0.1:5000/cotizaciones/cotizacionesc`;
    return this.http.get(url);
  }
  getCotizar(id_solicitud: any){
    const url = `http://127.0.0.1:5000/solicitud/${id_solicitud}`;
    return this.http.get(url);
  }

  getPredios():Observable<any>{
    return this.http.get(`${this.BASE_URL}/getPredios`);
  }

  getPredioId(id:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/getPredio/${id}`);
  }

  getGastos(id:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/getPredios/${id}`);
  }

  getCasas(id:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/getPredios/${id}/getCasas`);
  }

  getTipoGastos():Observable<any>{
    return this.http.get(`${this.BASE_URL}/getTipoGastosComunes`);
  }

  getDescripGastos(id:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/getTipoGastosComunes/${id}`);
  }

  getGastosPredios(id:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/getGastosPredios/${id}`);
  }

  getGastosPrediosI(id:string, idgasto:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/getGastosPredios/21/1`);
  }

  postGastosPredios(id_pre_ga:string, id_ga:string, imp:string):Observable<any>{
    const data = {
      id_predio_gastos: id_pre_ga,
      id_gasto: id_ga,
      importe: imp
    };
    return this.http.post(`${this.BASE_URL}/insertarGastoPredio`, data);
  }

  putGastosPredios(id_pre_ga_det:string, imp:string){
    const data = {
      id_predio_gastos_det: id_pre_ga_det,
      importe: imp
    };
    return this.http.put(`${this.BASE_URL}/actualizarGastoPredio`, data);
  }

  getRegistroPredioEstadoI():Observable<any>{
    return this.http.get(`${this.BASE_URL}/getRegistroPredioEstado`);
  }

  postRegistroPredioEstado(id_pred:string, id_pers:string, id_est:string, peri:string):Observable<any>{
    const data = {
      id_predio : id_pred,
      id_personal : id_pers,
      id_estado : id_est,
      periodo : peri
    };
    return this.http.post(`${this.BASE_URL}/insertarRegistroPredioEstado`, data);
  }

  putRegistroPredioEstado(id_est:string, id_pred:string, peri:string){
    const data = {
      id_estado : id_est,
      id_predio : id_pred,
      periodo : peri
    };
    return this.http.put(`${this.BASE_URL}/actualizarRegistroPredioEstado`, data);
  }
  obtenerDatos(tipo: string, id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/contratos/${tipo}/${id}`);
    
  }
  crearContrato(id: string, idSolicitudCotizacion: string): Observable<any> {
    const data = {
      id_solicitud_cotizacion: idSolicitudCotizacion,
      id: id,
    };
    return this.http.post(`${this.BASE_URL}/crear_contrato/personal/${id}/${idSolicitudCotizacion}`, data);

    
}
}
