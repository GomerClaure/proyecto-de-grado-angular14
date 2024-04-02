import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarComponent } from './menu/generar/generar.component';
import { VisualizarComponent } from './menu/visualizar/visualizar.component';

@NgModule({
  declarations: [
  
    GenerarComponent,
       VisualizarComponent
  ],
  imports: [ 
    CommonModule
  ]
})
export class PropietarioModule { }
