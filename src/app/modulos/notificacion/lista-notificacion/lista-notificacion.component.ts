import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/modelos/Notificacion';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-lista-notificacion',
  templateUrl: './lista-notificacion.component.html',
  styleUrls: ['./lista-notificacion.component.scss']
})
export class ListaNotificacionComponent implements OnInit {
  public notificaciones : Notificacion[];

  constructor(private notificacionService: NotificacionService, private websocketService: WebsocketService) { 
    this.notificaciones = [];
  }

  ngOnInit(): void {
    this.notificacionService.getNotificacionesTodas().subscribe(
      (data) => {
        this.notificaciones = data.notificaciones;
      },
      (error) => {
        console.error(error);
      }
    );

  }

}
