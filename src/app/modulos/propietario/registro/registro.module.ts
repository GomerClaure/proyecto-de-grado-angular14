import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistrarPlatilloComponent } from './registrar-platillo/registrar-platillo.component';
import { RegistrarEmpleadoComponent } from './registrar-empleado/registrar-empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  declarations: [
    RegistrarPlatilloComponent,
    RegistrarEmpleadoComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ] 
})
export class RegistroModule { }
