import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  
  private BASE_URL = 'http://127.0.0.1:5000/contratos/';
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }
  getContratos(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/contratos`);
  }
  get refresh$(){
    return this._refresh$;
  }
  contratos(tipo: string, id: string): Observable<any> {
    const url = `http://127.0.0.1:5000/contratos/${tipo}/${id}`;
    return this.http.get(url).pipe(
      catchError(error => {
        // Manejar el error aquí, ya sea registrándolo, notificándolo o realizando alguna acción específica.
        console.error('Error en la solicitud:', error);
        return throwError(error); // Reenviar el error para que sea manejado por el suscriptor.
      })
    );
  }
  crearContrato(id: string, idSolicitudCotizacion: string): Observable<any> {
    const url = `http://127.0.0.1:5000/crear_contrato/personal/${id}/${idSolicitudCotizacion}`;
    return this.http.post(url, {}).pipe(
        tap(response => {
          // Manejar la respuesta aquí si es necesario
          console.log('Respuesta de crearContrato:', response);
        })
      );
    
  }
  

}
