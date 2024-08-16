import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeseroRoutingModule } from './mesero-routing.module';
import { ModalPedidoComponent } from './modal-pedido/modal-pedido.component';
import { ListaMesasComponent } from './lista-mesas/lista-mesas.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { RegistrarPedidoComponent } from './registrar-pedido/registrar-pedido.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
<<<<<<< HEAD
import { ModalPedidosComponent } from './modal-pedidos/modal-pedidos.component';
import { ModalEliminarPedidoComponent } from './modal-eliminar-pedido/modal-eliminar-pedido.component';
=======
>>>>>>> master

@NgModule({
  declarations: [
    ModalPedidoComponent,
    ListaMesasComponent,
    ListaPedidosComponent,
<<<<<<< HEAD
    RegistrarPedidoComponent,
    ModalPedidosComponent,
    ModalEliminarPedidoComponent
=======
    RegistrarPedidoComponent
>>>>>>> master
  ],
  imports: [
    CommonModule,
    MeseroRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule
  ]
})
export class MeseroModule { }
