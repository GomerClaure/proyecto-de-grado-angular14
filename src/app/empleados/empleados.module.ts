import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { FormDatosPersonalesComponent } from './form-datos-personales/form-datos-personales.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    FormDatosPersonalesComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    NgToastModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class EmpleadosModule { }