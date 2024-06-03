import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/modelos/Notificacion';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';

@Component({
  selector: 'app-lista-notificacion',
  templateUrl: './lista-notificacion.component.html',
  styleUrls: ['./lista-notificacion.component.scss']
})
export class ListaNotificacionComponent implements OnInit {
  public notificaciones : Notificacion[];

  constructor(private notificacionService: NotificacionService) { 
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
  }

}
