import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { PlantillaListaPedidosComponent } from './plantilla-lista-pedidos/plantilla-lista-pedidos.component';
import { PlantillaPedidosComponent } from './plantilla-pedidos/plantilla-pedidos.component';

const routes: Routes = [
    {
        path: '',
        children: [
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
            },
            
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
export class ReporteRoutingModule { }
