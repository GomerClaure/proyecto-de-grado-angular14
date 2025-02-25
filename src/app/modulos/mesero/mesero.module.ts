import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeseroRoutingModule } from './mesero-routing.module';
import { ModalDetallePedidoComponent } from './modal-detalle-pedido/modal-detalle-pedido.component';
import { ListaMesasComponent } from './lista-mesas/lista-mesas.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { RegistrarPedidoComponent } from './registrar-pedido/registrar-pedido.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPedidosComponent } from './modal-pedidos/modal-pedidos.component';
import { ModalEliminarPedidoComponent } from './modal-eliminar-pedido/modal-eliminar-pedido.component';
import { ModalDatosCuentaComponent } from './modal-datos-cuenta/modal-datos-cuenta.component';

@NgModule({
  declarations: [
    ModalDetallePedidoComponent,
    ListaMesasComponent,
    ListaPedidosComponent,
    RegistrarPedidoComponent,
    ModalPedidosComponent,
    ModalEliminarPedidoComponent,
    ModalDatosCuentaComponent,
  ],
  imports: [
    CommonModule,
    MeseroRoutingModule,
    ComponentsModule,
    ReactiveFormsModule, 
    FormsModule,
  ],
})
export class MeseroModule { }
