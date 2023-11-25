import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NombreUsuarioService {
  nombreUsuario: string = '';
  apellido1: string = '';
  apellido2: string = '';
  id: string='';
  tipo: string = ''; // Agregar la propiedad 'tipo'
  constructor() { }
  
}
