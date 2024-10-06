import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostrarPedidosCComponent } from './mostrar-pedidos-c/mostrar-pedidos-c.component';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'lista-pedidos',
        component:MostrarPedidosCComponent
      },
      {
        path:'lista-cuentas-cerradas',
        component:MostrarPedidosCComponent
      },
      {
        path:'registrar-pedido-cajero',
        component:MostrarPedidosCComponent 
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
export class CajeroRoutingModule { }
