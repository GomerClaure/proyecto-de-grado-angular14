import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteRoutingModule } from './reporte-routing.module';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
// import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { PlantillaListaPedidosComponent } from './plantilla-lista-pedidos/plantilla-lista-pedidos.component';

@NgModule({
  declarations: [
    ListaPedidosComponent,
    ListaVentasComponent,
    PlantillaListaPedidosComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    ComponentsModule,
    FormsModule,
    NgChartsModule,
  ]
})
export class ReporteModule { }
