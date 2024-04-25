import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';
import { RegistrarPlatilloComponent } from './registrar-platillo/registrar-platillo.component';
import { RegistrarEmpleadoComponent } from './registrar-empleado/registrar-empleado.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  declarations: [
    RegistrarCategoriaComponent,
    RegistrarPlatilloComponent,
    RegistrarEmpleadoComponent,
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule
  ]
})
export class RegistroModule { }
