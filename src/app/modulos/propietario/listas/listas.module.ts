import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaRoutingModule } from './lista-routing.module';
import { ModalEliminarCategoriaComponent } from './modal-eliminar-categoria/modal-eliminar-categoria.component';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './lista-platillo/lista-platillo.component';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarCategoriaComponent } from '../editar/editar-categoria/editar-categoria.component';


@NgModule({
  declarations: [
    ModalEliminarCategoriaComponent,
    ListaCategoriaComponent,
    ListaPlatilloComponent,
    ModalEliminarComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListasModule { } 
