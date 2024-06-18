import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListaNotificacionComponent } from './lista-notificacion/lista-notificacion.component';
import { NotificacionRoutingModule } from './notificacion-routing.module';


@NgModule({
  declarations: [
    ListaNotificacionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NotificacionRoutingModule
  ]
})
export class NotificacionModule { }
