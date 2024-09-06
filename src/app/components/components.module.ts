import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrarCategoriaComponent } from '../modulos/propietario/registro/registrar-categoria/registrar-categoria.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VistaMenuComponent } from './vista-menu/vista-menu.component';
import { ModalPlatilloComponent } from './modal-platillo/modal-platillo.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    RegistrarCategoriaComponent,
    VistaMenuComponent,
    ModalPlatilloComponent
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
