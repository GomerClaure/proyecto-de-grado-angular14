import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router'
import { RegistrarPlatilloComponent } from './registrar-platillo/registrar-platillo.component';
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';
import { RegistrarEmpleadoComponent } from './registrar-empleado/registrar-empleado.component';
const routes:Routes=[
  {
    path:'',
    children:[
      {
        path:'platillo',
        component:RegistrarPlatilloComponent
      },
      {
        path:'categoria',
        component:RegistrarCategoriaComponent
      },
      {
        path:'empleado',
        component:RegistrarEmpleadoComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistroRoutingModule { }
