import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrarCategoriaComponent } from '../modulos/propietario/registro/registrar-categoria/registrar-categoria.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    RegistrarCategoriaComponent,
    MapComponent
  ],
  exports:[
    NavComponent, 
    FooterComponent,
    MapComponent
  ], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
    
  ]
})
export class ComponentsModule { }
