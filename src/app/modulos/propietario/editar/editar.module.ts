import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { EditarPlatilloComponent } from './editar-platillo/editar-platillo.component';

@NgModule({
  declarations: [
    EditarCategoriaComponent,
    EditarPlatilloComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ComponentsModule,
    ReactiveFormsModule
  ]
}) 
export class EditarModule { }
