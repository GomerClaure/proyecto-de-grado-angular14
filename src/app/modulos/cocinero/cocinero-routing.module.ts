import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { MostrarPedidosComponent } from './mostrar-pedidos/mostrar-pedidos.component';
import { CambiarEstadoPedidoComponent } from './cambiar-estado-pedido/cambiar-estado-pedido.component';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'camabiar-estado-pedido',
        component:CambiarEstadoPedidoComponent
      },
      {
        path:'mostrar-pedidos',
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
export class CocineroRoutingModule {

 }
