import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPedidosCComponent } from './mostrar-pedidos-c/mostrar-pedidos-c.component';
import { CajeroRoutingModule } from './cajero-routing.module';
import { ComponentsModule } from "../../components/components.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MostrarPedidosCComponent
  ],
  imports: [
    CommonModule, 
    CajeroRoutingModule,
    ComponentsModule,
    FormsModule
]
})

export class CajeroModule { }
