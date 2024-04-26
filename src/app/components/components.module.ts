import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RegistroModule } from '../modulos/propietario/registro/registro.module';
import { RegistrarCategoriaComponent } from '../modulos/propietario/registro/registrar-categoria/registrar-categoria.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarCategoriaModule } from '../modulos/propietario/registro/registrar-categoria/registrar-categoria.module';
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
    ReactiveFormsModule
    
  ]
})
export class ComponentsModule { }
