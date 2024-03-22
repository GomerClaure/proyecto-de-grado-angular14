import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './lista-platillo/lista-platillo.component';
import { EditarPlatilloComponent } from '../editar/editar-platillo/editar-platillo.component';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'categoria',
        component:ListaCategoriaComponent
      },
      {
        path:'platillo',
        component:ListaPlatilloComponent
      },
      {
        path:'editar-platillo',
        component:EditarPlatilloComponent
      }
    ]
  }
]

@NgModule({
  declarations: [], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ListaRoutingModule { }
