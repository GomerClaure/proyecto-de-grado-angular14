import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRoutingModule } from './lista-routing.module';
import { ModalEliminarCategoriaComponent } from './modal-eliminar-categoria/modal-eliminar-categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './lista-platillo/lista-platillo.component';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { EditarModule } from '../editar/editar.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    ModalEliminarCategoriaComponent,
    ListaCategoriaComponent,
    ListaPlatilloComponent,
    ModalEliminarComponent
  
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    EditarModule,
    ComponentsModule,
    FormsModule
  ]
})
export class ListasModule { } 
