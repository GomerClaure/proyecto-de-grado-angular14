import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarComponent } from './generar/generar.component';
import { VisualizarQrComponent } from './visualizar-qr/visualizar-qr.component';
import { Routes,RouterModule } from '@angular/router';
import { VistaMenuComponent } from './vista-menu/vista-menu.component';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'generar',
        component:GenerarComponent
      },
      {
        path:'qr',
        component:VisualizarQrComponent
      },
      {
        path:'vista',
        component:VistaMenuComponent
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
export class MenuRoutingModule { }
