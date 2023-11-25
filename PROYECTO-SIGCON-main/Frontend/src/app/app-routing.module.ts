import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecaudacionComponent } from './components/recaudacion/recaudacion.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { MantenimientoRecibosComponent } from './components/mantenimiento-recibos/mantenimiento-recibos.component';
import { LoginComponent } from './components/Firmar/auth/login/login.component';
import { DashboardComponent } from './components/Firmar/pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/Firmar/shared/header/header.component';
import { ContratosComponent } from './components/Firmar/contratos/contratos.component';
const routes: Routes = [
  {
    path:'RegistrarRecaudacion', component:RecaudacionComponent,
  },
  {
    path: 'SeguimientoCotizacion', component:SeguimientoComponent,
  },
  {
    path: 'SeguimientoCotizacion/cotizacion/:id_solicitud', component:CotizacionComponent,
  },
  {
    path:'inicio',component:HeaderComponent
  },
  {
    path:'iniciar-sesion',component:LoginComponent
  },
  {
    path: 'contratos/:tipo/:id', component: ContratosComponent, 
  },
  {
    path: 'EmitirRecibos', component:MantenimientoRecibosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
