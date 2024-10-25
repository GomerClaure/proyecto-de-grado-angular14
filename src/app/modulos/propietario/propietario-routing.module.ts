import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCategoriaComponent } from './listas/lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './listas/lista-platillo/lista-platillo.component';
import { EditarPlatilloComponent } from './editar/editar-platillo/editar-platillo.component';
import { GenerarComponent } from './menu/generar/generar.component';
import { VisualizarQrComponent } from './menu/visualizar-qr/visualizar-qr.component';
import { PlantillaQrComponent } from './menu/plantilla-qr/plantilla-qr.component';
import { RegistrarPlatilloComponent } from './registro/registrar-platillo/registrar-platillo.component';
import { RegistrarCategoriaComponent } from './registro/registrar-categoria/registrar-categoria.component';
import { RegistrarEmpleadoComponent } from './registro/registrar-empleado/registrar-empleado.component';
import { ListaPedidosComponentR } from './reporte/lista-pedidosR/lista-pedidosR.component';
import { ListaVentasComponent } from './reporte/lista-ventas/lista-ventas.component';
import { PlantillaListaPedidosComponent } from './reporte/plantilla-lista-pedidos/plantilla-lista-pedidos.component';
import { ManejoCuentaEmpleadoComponent } from './manejo-cuenta-empleado/manejo-cuenta-empleado.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

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
          path: 'pedidosR',
          component: ListaPedidosComponentR
      },
      {
          path: 'ventas',
          component: ListaVentasComponent
      }
      ,
      {
          path: 'plantilla-pedidos',
          component: PlantillaListaPedidosComponent
      },
      {
        path: 'manejo-cuenta-empleado',
        component: ManejoCuentaEmpleadoComponent
      },
      {
        path:'datos-personales',
        component:DatosPersonalesComponent
      },
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class PropietarioRoutingModule { }

 