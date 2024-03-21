import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './lista-platillo/lista-platillo.component';

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
