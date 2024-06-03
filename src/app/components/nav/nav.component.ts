import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { Notificacion } from 'src/app/modelos/Notificacion';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public notificaciones : Notificacion[];

  constructor(private sessionService: SessionService,private router:Router,
     private notificacionService: NotificacionService, private webSocketService: WebsocketService) {
    this.notificaciones = [];
      }

  ngOnInit(): void {
    if (sessionStorage.getItem('token_access')) {
      this.webSocketService.iniciarConexion();
      this.webSocketService.listenAllEvents('pedido');
    }
    let bandera = sessionStorage.getItem('tipo') === 'Empleado';
    
    if (bandera){
      console.log('jejejejejej')
      this.notificacionService.getNotificaciones().subscribe(
        (data) => {
          console.log(data);
          this.notificaciones = data.notificaciones;
          console.log(this.notificaciones);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
  
  esAdministrador(): boolean {
    return sessionStorage.getItem('tipo') === 'Administrador';
  }

  esPropietario(): boolean {
    return sessionStorage.getItem('tipo') === 'Propietario';
  }

  esEmpleado(): boolean {
    let bandera = sessionStorage.getItem('tipo') === 'Empleado';
    if (bandera){
      this.notificacionService.getNotificaciones().subscribe(
        (data) => {
          this.notificaciones = data.notificaciones;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    return bandera;
  }

  cerrarSesion() {
    this.sessionService.logout();
  }

  mostrarModalCategoria(): void {
    console.log("modal");
    this.router.navigateByUrl('/registrar/categoria');
  }

  irAMenu(){
    this.router.navigateByUrl('/menu/vista/1');
  }

  suscribirseEventosDePedido(){
    
 
} 

}