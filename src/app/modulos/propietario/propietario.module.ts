import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropietarioRoutingModule } from './propietario-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { NgChartsModule } from 'ng2-charts';
//listas
import { ModalEliminarCategoriaComponent } from './listas/modal-eliminar-categoria/modal-eliminar-categoria.component';
import { ListaCategoriaComponent } from './listas/lista-categoria/lista-categoria.component';
import { ListaPlatilloComponent } from './listas/lista-platillo/lista-platillo.component';
import { ModalEliminarComponent } from './listas/modal-eliminar/modal-eliminar.component';
import { EditarCategoriaComponent } from './editar/editar-categoria/editar-categoria.component';
import { ListaPedidosComponent } from '../mesero/lista-pedidos/lista-pedidos.component';
//menu
import { GenerarComponent } from './menu/generar/generar.component';
import { VisualizarQrComponent } from './menu/visualizar-qr/visualizar-qr.component';
import { PlantillaQrComponent } from './menu/plantilla-qr/plantilla-qr.component';
import { VistaMenuComponent } from './menu/vista-menu/vista-menu.component';
import { ModalPlatilloComponent } from './menu/modal-platillo/modal-platillo.component';
//registro
import { RegistrarPlatilloComponent } from './registro/registrar-platillo/registrar-platillo.component';
import { RegistrarEmpleadoComponent } from './registro/registrar-empleado/registrar-empleado.component';
import { EditarPlatilloComponent } from './editar/editar-platillo/editar-platillo.component';
//reporte
import { ListaVentasComponent } from './reporte/lista-ventas/lista-ventas.component';
import { PlantillaListaPedidosComponent } from './reporte/plantilla-lista-pedidos/plantilla-lista-pedidos.component';
import { ListaPedidosComponentR } from './reporte/lista-pedidosR/lista-pedidos.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    //listas
    ModalEliminarCategoriaComponent,
    ListaCategoriaComponent,
    ListaPlatilloComponent,
    ModalEliminarComponent,
    EditarCategoriaComponent,
   //menu
    GenerarComponent,
    VisualizarQrComponent,
    PlantillaQrComponent,
    VistaMenuComponent,
    ModalPlatilloComponent,
   //registro
    RegistrarPlatilloComponent,
    RegistrarEmpleadoComponent,
    EditarPlatilloComponent,
  //reporte
    ListaPedidosComponentR,
    ListaVentasComponent,
    PlantillaListaPedidosComponent
  ],
  imports: [
    CommonModule,
    PropietarioRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    NgChartsModule
  ]
})
export class PropietarioModule { }
