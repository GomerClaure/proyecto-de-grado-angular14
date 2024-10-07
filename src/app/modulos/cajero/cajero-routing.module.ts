import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostrarPedidosCComponent } from './mostrar-pedidos-c/mostrar-pedidos-c.component';
import { ListaCuentasComponent } from './lista-cuentas/lista-cuentas.component';

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
        component:ListaCuentasComponent
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
