import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarComponent } from './generar/generar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { Routes,RouterModule } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'generar',
        component:GenerarComponent
      },
      {
        path:'visualizar',
        component:VisualizarComponent
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
