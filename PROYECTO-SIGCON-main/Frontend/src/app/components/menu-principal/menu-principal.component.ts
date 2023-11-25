import { Component } from '@angular/core';
import { NombreUsuarioService } from 'src/app/services/nombre-usuario.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  nameUsuario: string='';

  constructor(private usuarioService: NombreUsuarioService){
    this.nameUsuario = this.usuarioService.nombreUsuario;
  }

  

}
