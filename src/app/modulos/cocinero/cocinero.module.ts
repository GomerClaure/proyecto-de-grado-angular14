import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPedidosComponent } from './mostrar-pedidos/mostrar-pedidos.component';
import { CocineroRoutingModule } from './cocinero-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    MostrarPedidosComponent
  ],
  imports: [
    CommonModule,
    CocineroRoutingModule,
    ComponentsModule
  ]
})
export class CocineroModule { }
