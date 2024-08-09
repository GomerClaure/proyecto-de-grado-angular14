import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPedidosComponent } from './mostrar-pedidos/mostrar-pedidos.component';
import { CocineroRoutingModule } from './cocinero-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalEstadoPedidoComponent } from './modal-estado-pedido/modal-estado-pedido.component';
import { MostrarDetallePedidosComponent } from './mostrar-detalle-pedidos/mostrar-detalle-pedidos.component';



@NgModule({
  declarations: [
    MostrarPedidosComponent,
    ModalEstadoPedidoComponent,
    MostrarDetallePedidosComponent
  ],
  imports: [
    CommonModule,
    CocineroRoutingModule,
    ComponentsModule
  ]
})
export class CocineroModule { }
