import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarComponent } from './generar/generar.component';
import { VisualizarQrComponent } from './visualizar-qr/visualizar-qr.component';
import { Routes,RouterModule } from '@angular/router';
import { VistaMenuComponent } from './vista-menu/vista-menu.component';
import { PlantillaQrComponent } from './plantilla-qr/plantilla-qr.component';

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
      },
      { path:'imprimir/qr',
        component:PlantillaQrComponent
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
