import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { GenerarComponent } from './generar/generar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GenerarComponent,
    VisualizarComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class MenuModule { }
