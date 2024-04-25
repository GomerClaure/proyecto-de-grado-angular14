import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroModule } from './registro/registro.module';
import { ListasModule } from './listas/listas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [  
    CommonModule,
    RegistroModule,
    ListasModule,
    ReactiveFormsModule,
    FormsModule
    
  ] 
})
export class PropietarioModule { }
