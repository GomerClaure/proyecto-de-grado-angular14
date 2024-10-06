import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ManejoCuentaPersonalComponent } from './manejo-cuenta-personal/manejo-cuenta-personal.component';
const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'ver-formularios',
        component:SolicitudesComponent
      },
      {
        path:'manejo-cuentas-propietarios',
        component:ManejoCuentaPersonalComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdministradorRoutingModule { }
