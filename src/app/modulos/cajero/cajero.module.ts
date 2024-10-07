import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPedidosCComponent } from './mostrar-pedidos-c/mostrar-pedidos-c.component';
import { CajeroRoutingModule } from './cajero-routing.module';
import { ComponentsModule } from "../../components/components.module";
import { FormsModule } from '@angular/forms';
import { ListaCuentasComponent } from './lista-cuentas/lista-cuentas.component';


@NgModule({
  declarations: [
    MostrarPedidosCComponent,
    ListaCuentasComponent
  ],
  imports: [
    CommonModule,
    CajeroRoutingModule,
    ComponentsModule,
    FormsModule
]
})

export class CajeroModule { }
