import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-formato-solicitud',
  templateUrl: './formato-solicitud.component.html',
  styleUrls: ['./formato-solicitud.component.css']
})
export class FormatoSolicitudComponent {

  nroSolicitud: string = "";
  nombreSolicitante: string = "";
  fechaSolicitud: string = "";
  predio: string = "";
  areaPredio: string = "";
  numeroCasas: string = "";
  cantAreasComunes: string = "";
  areaAreasComunes: string = "";
  servicio: string = "";
  cantidad: string = "";
  mostrar: string = "";
  areasComunes: any[] = [];

  constructor(private solicitudService:SolicitudService, private router: Router){
    this.nroSolicitud = this.solicitudService.nroSolicitud;
    this.nombreSolicitante = this.solicitudService.nombreSolicitante;
    this.fechaSolicitud = this.solicitudService.fechaSolicitud; 
    this.predio = this.solicitudService.predio;
    this.areaPredio = this.solicitudService.areaPredio;
    this.numeroCasas = this.solicitudService.numeroCasas;
    this.cantAreasComunes = this.solicitudService.cantAreasComunes;
    this.areaAreasComunes = this.solicitudService.areaAreasComunes;
    this.servicio = this.solicitudService.servicio;
    this.areasComunes = this.solicitudService.areasComunes;

    if (this.servicio=='Limpieza'){
      this.cantidad = this.solicitudService.cant_plimpieza;
    }
    
    if (this.servicio=='Jardineria'){
      this.cantidad = this.solicitudService.cant_jardineria;
    }
    if (this.servicio=='Seguridad'){
      this.cantidad = this.solicitudService.cant_vigilantes;
    }

    if (this.servicio=='Administracion'){
      this.cantidad = '1), Seguridad(' +this.solicitudService.cant_vigilantes+'), Limpieza ('+this.solicitudService.cant_plimpieza+'), Jardineria('+this.solicitudService.cant_jardineria;
    }
  }
  
  public downloadPDF(): void {
    const doc = new jsPDF('p', 'mm', 'a4');
  
    const docWidth = doc.internal.pageSize.getWidth();
  
    const blueColor = '#007BFF';
    const headerHeight = 30;
    doc.setFillColor(blueColor);
    doc.rect(0, 0, docWidth, headerHeight, 'F');
  
    const logoPath = 'assets/logo/Condosa_circular_blanco.png';
    const logoWidth = 20;
    const logoHeight = 20;
    const logoMargin = 10;
    const logoY = headerHeight / 2 - logoHeight / 2;
    doc.addImage(logoPath, 'PNG', logoMargin, logoY, logoWidth, logoHeight);
  
    const empresaText = 'Condosa';
    const empresaFontSize = 24;
    const empresaMargin = logoMargin + logoWidth + 5;
    const empresaY = headerHeight / 2 + 6;
    doc.setFontSize(empresaFontSize);
    doc.setTextColor('#FFFFFF');
    doc.text(empresaText, empresaMargin, empresaY);
  
    const contenidoY = headerHeight + 10;
    const fontSize = 12;
    const font = '';
  
    doc.setFontSize(fontSize);
    doc.setTextColor('#000000');
  
    doc.setFont(font, 'bold')
    doc.text('N° Solicitud:', 10, contenidoY);
    doc.setFont(font, 'normal')
    doc.text(String(this.nroSolicitud), 80, contenidoY);
  
    doc.setFont(font, 'bold')
    doc.text('Nombre solicitante:', 10, contenidoY + 10);
    doc.setFont(font, 'normal')
    doc.text(String(this.nombreSolicitante), 80, contenidoY + 10);
  
    doc.setFont(font, 'bold')
    doc.text('Fecha de solicitud:', 10, contenidoY + 20);
    doc.setFont(font, 'normal')
    doc.text(String(this.fechaSolicitud), 80, contenidoY + 20);
  
    doc.setFont(font, 'bold')
    doc.text('Predio:', 10, contenidoY + 30);
    doc.setFont(font, 'normal')
    doc.text(String(this.predio), 80, contenidoY + 30);
  
    doc.setFont(font, 'bold')
    doc.text('Área del predio:', 10, contenidoY + 40);
    doc.setFont(font, 'normal')
    doc.text(String(this.areaPredio) + ' m²', 80, contenidoY + 40);
  
    doc.setFont(font, 'bold')
    doc.text('Número de Casas - Habitación:', 10, contenidoY + 50);
    doc.setFont('', 'normal')
    doc.text(String(this.numeroCasas), 80, contenidoY + 50);

    doc.setFont(font, 'bold')
    doc.text('Servicio solicitado:', 10, contenidoY + 60);
    doc.setFont('', 'normal')
    doc.text(String(this.servicio)+"("+String(this.cantidad)+")", 80, contenidoY + 60);
  
    doc.setFont(font, 'bold')
    doc.text('Áreas comunes:', 10, contenidoY + 70);
    doc.setFont(font, 'normal')
    doc.text(String(this.areaAreasComunes) + ' m² total (' + String(this.cantAreasComunes) + ')', 80, contenidoY + 70);
  
   // Dibujar el rectángulo alrededor del detalle de áreas comunes
  const areasComunesX = 10;
  const areasComunesY = contenidoY + 80;
  const areasComunesWidth = 180;
  const areasComunesHeight = 60;
  doc.rect(areasComunesX, areasComunesY, areasComunesWidth, areasComunesHeight, 'S');

  // Mostrar el título del detalle de áreas comunes
  doc.setFont(font, 'bold');
  doc.setFontSize(16);
  doc.text('Detalle de áreas comunes', areasComunesX + 5, areasComunesY + 10);

  // Mostrar cada área común dentro del rectángulo
  let areaComunY = areasComunesY + 20;
  doc.setFontSize(fontSize);
  this.areasComunes.forEach((ac) => {
    doc.setFont(font, 'bold')
    doc.text('Nombre:', areasComunesX + 10, areaComunY);
    doc.setFont(font, 'normal')
    doc.text(ac.nombre, areasComunesX + 50, areaComunY);

    doc.setFont(font, 'bold')
    doc.text('Área en m²:', areasComunesX + 10, areaComunY + 10);
    doc.setFont(font, 'normal')
    doc.text(ac.area, areasComunesX + 50, areaComunY + 10);

    areaComunY += 20;
  });

  
    // Guardar el PDF
    doc.save('formato-solicitud.pdf');
  }
  
  regresar(){
    this.router.navigateByUrl('/pagina1');
  }  
  
  mostrarAreas(){
    if(this.mostrar == ""){
      this.mostrar = "show";
    }else{
      this.mostrar = "";
    }
  }

  
}
