import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { EditarPlatilloComponent } from './editar-platillo/editar-platillo.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarCategoriaComponent,
    EditarPlatilloComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class EditarModule { }
