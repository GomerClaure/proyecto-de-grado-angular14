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
    this.notificacionService.getNotificaciones().subscribe(
      (data) => {
        this.notificaciones = data.notificaciones;
        console.log(this.notificaciones);
      },
      (error) => {
        console.error(error);
      }
    );

    this.websocketService.iniciarConexion();
    this.websocketService.listen('notificaciones'+sessionStorage.getItem('id_restaurante')).bind('Notificacion',
     (data: Notificacion) => {
      //guardar al principio del arreglo
      
      let nuevaNotificacion: Notificacion = data;
      console.log(nuevaNotificacion);
      this.notificaciones.unshift(data);
    }
    );
  }

}
