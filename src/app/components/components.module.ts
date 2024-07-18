import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrarCategoriaComponent } from '../modulos/propietario/registro/registrar-categoria/registrar-categoria.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    RegistrarCategoriaComponent
  ],
  exports:[
    NavComponent, 
    FooterComponent
  ], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
    
  ]
})
export class ComponentsModule { }
