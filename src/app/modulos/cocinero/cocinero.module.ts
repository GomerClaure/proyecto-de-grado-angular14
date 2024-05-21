import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CocineroRoutingModule } from './cocinero-routing.module';
import { MostrarPedidosComponent } from './mostrar-pedidos/mostrar-pedidos.component';
import { CambiarEstadoPedidoComponent } from './cambiar-estado-pedido/cambiar-estado-pedido.component';



@NgModule({
  declarations: [
    MostrarPedidosComponent,
    CambiarEstadoPedidoComponent
  ],
  imports: [
    CommonModule,
    CocineroRoutingModule,
    BrowserModule
  ]
})
export class CocineroModule { }
