import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//Listas
import { ListaCategoriaComponent } from './listas/lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './listas/lista-platillo/lista-platillo.component';
import { EditarPlatilloComponent } from './editar/editar-platillo/editar-platillo.component';
//
import { GenerarComponent } from './menu/generar/generar.component';
import { VisualizarQrComponent } from './menu/visualizar-qr/visualizar-qr.component';
import { VistaMenuComponent } from './menu/vista-menu/vista-menu.component';
import { PlantillaQrComponent } from './menu/plantilla-qr/plantilla-qr.component';
import { RegistrarPlatilloComponent } from './registro/registrar-platillo/registrar-platillo.component';
import { RegistrarCategoriaComponent } from './registro/registrar-categoria/registrar-categoria.component';
import { RegistrarEmpleadoComponent } from './registro/registrar-empleado/registrar-empleado.component';
import { ListaPedidosComponent } from '../mesero/lista-pedidos/lista-pedidos.component';
import { ListaVentasComponent } from './reporte/lista-ventas/lista-ventas.component';
import { PlantillaListaPedidosComponent } from './reporte/plantilla-lista-pedidos/plantilla-lista-pedidos.component';

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
        },
        {
          path:'generar',
          component:GenerarComponent
        },
        {
          path:'qr',
          component:VisualizarQrComponent
        },
        {
          path:'vista/:menu',
          component:VistaMenuComponent
        },
        { path:'imprimir/qr',
          component:PlantillaQrComponent
        },
        {
          path:'platillo/registrar',
          component:RegistrarPlatilloComponent
        },
        {
          path:'categoria',
          component:RegistrarCategoriaComponent
        },
        {
          path:'empleado',
          component:RegistrarEmpleadoComponent
        },
        {
          path: 'pedidos',
          component: ListaPedidosComponent
      },
      {
          path: 'ventas',
          component: ListaVentasComponent
      }
      ,
      {
          path: 'plantilla-pedidos',
          component: PlantillaListaPedidosComponent
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
export class PropietarioRoutingModule { }
 