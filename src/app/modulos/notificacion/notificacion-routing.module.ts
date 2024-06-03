import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListaNotificacionComponent } from './lista-notificacion/lista-notificacion.component';

const routes:Routes=[
  {
    path:'',
    children:[ 
      {
        path:'lista-notificacion',
        component:ListaNotificacionComponent
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

export class NotificacionRoutingModule {};