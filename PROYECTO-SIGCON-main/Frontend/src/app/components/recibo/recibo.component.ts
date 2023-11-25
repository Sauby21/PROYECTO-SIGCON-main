import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit{

  datosPredioSuperior = [];
  datosPersona = [];
  datosPredioInferior = [];
  constructor() { }

  ngOnInit() {
  }

}
