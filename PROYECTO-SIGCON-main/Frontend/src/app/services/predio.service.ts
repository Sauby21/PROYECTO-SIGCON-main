import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredioService {
  private _idPredioSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _nombrePredio: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get idPredio$() {
    return this._idPredioSubject.asObservable();
  }

  get nombrePredio$(){
    return this._nombrePredio.asObservable();
  }
  
  updateIdPredio(idPredio: string) {
    this._idPredioSubject.next(idPredio);
  }

  updateNombrePredio(nombrePredio: string) {
    this._nombrePredio.next(nombrePredio);
  }
  
}
