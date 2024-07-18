import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostrarPedidosComponent } from './mostrar-pedidos/mostrar-pedidos.component';


const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'pedido-cocina',
        component:MostrarPedidosComponent
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
export class CocineroRoutingModule { }
