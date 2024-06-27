import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteRoutingModule } from './reporte-routing.module';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ListaPedidosComponent,
    ListaVentasComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    ComponentsModule
  ]
})
export class ReporteModule { }
