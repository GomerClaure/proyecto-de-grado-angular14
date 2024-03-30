import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { RegistrarPedidoComponent } from './registrar-pedido/registrar-pedido.component';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'lista-pedidos',
        component:ListaPedidosComponent
      },
      {
        path:'registrar-pedido',
        component:RegistrarPedidoComponent
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
export class MeseroRoutingModule {

 }
