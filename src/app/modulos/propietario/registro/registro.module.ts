import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistrarPlatilloComponent } from './registrar-platillo/registrar-platillo.component';
import { RegistrarEmpleadoComponent } from './registrar-empleado/registrar-empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
<<<<<<< HEAD
=======
import { EditarCategoriaComponent } from '../editar/editar-categoria/editar-categoria.component';
>>>>>>> master
import { EditarPlatilloComponent } from '../editar/editar-platillo/editar-platillo.component';
import { NgToastModule } from 'ng-angular-popup';
@NgModule({
  declarations: [
    RegistrarPlatilloComponent,
    RegistrarEmpleadoComponent,
    EditarPlatilloComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    FormsModule, 
=======
    FormsModule,
>>>>>>> master
    ComponentsModule,
    NgToastModule
  ] 
})
export class RegistroModule { }
