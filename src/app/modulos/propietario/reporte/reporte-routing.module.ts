import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';

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
