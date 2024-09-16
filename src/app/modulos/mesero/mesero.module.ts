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
import { ModalPedidosComponent } from './modal-pedidos/modal-pedidos.component';
import { ModalEliminarPedidoComponent } from './modal-eliminar-pedido/modal-eliminar-pedido.component';
import { DatosPersonalesComponent } from './datos-personales-propietario/datos-personales/datos-personales.component';

@NgModule({
  declarations: [
    ModalPedidoComponent,
    ListaMesasComponent,
    ListaPedidosComponent,
    RegistrarPedidoComponent,
    ModalPedidosComponent,
    ModalEliminarPedidoComponent,
    DatosPersonalesComponent
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
