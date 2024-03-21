import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPlatilloComponent } from './listas/lista-platillo/lista-platillo.component';
import { ListaCategoriaComponent } from './listas/lista-categoria/lista-categoria.component';



@NgModule({
  declarations: [
    ListaPlatilloComponent,
    ListaCategoriaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PropietarioModule { }
