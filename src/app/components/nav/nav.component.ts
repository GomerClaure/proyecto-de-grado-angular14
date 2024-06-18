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
  public notificaciones: Notificacion[];
  public notificacionesSinLeer: number;
  private idRestaurante: number;

  constructor(private sessionService: SessionService, private router: Router,
    private notificacionService: NotificacionService, private webSocketService: WebsocketService) {
    this.notificaciones = [];
    this.idRestaurante = 0;
    this.notificacionesSinLeer = 0;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token_access')) {
      this.webSocketService.iniciarConexion();
      // this.webSocketService.listenAllEvents('pedido');
      this.idRestaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
      this.suscribirNotificacion();

      let sesionComoEmpleado = sessionStorage.getItem('tipo') === 'Empleado';

      if (sesionComoEmpleado) {
        this.notificacionService.getNotificaciones(5).subscribe(
          (data) => {
            this.notificaciones = data.notificaciones;
            this.notificaciones.forEach(notificacion => {
              if (notificacion.read_at === null) {
                this.notificacionesSinLeer++;
              }
            });

            console.log(this.notificaciones);
          },
          (error) => {
            console.error(error);
          }
        );
      }

    }

  }

  esAdministrador(): boolean {
    return sessionStorage.getItem('tipo') === 'Administrador';
  }

  esPropietario(): boolean {
    return sessionStorage.getItem('tipo') === 'Propietario';
  }

  esEmpleado(): boolean {
    let sesionComoEmpleado = sessionStorage.getItem('tipo') === 'Empleado';
    return sesionComoEmpleado;
  }

  cerrarSesion() {
    this.sessionService.logout();
  }

  mostrarModalCategoria(): void {
    console.log("modal");
    this.router.navigateByUrl('/registrar/categoria');
  }

  irAMenu() {
    this.router.navigateByUrl('/menu/vista/1');
  }

  suscribirNotificacion() {
    this.webSocketService.listenAllEvents('notificaciones' + this.idRestaurante).bind('Notificacion', (data: any) => {
     
      let idUsuario = parseInt(sessionStorage.getItem('id_user') || '0');
      let rolEmpleado = sessionStorage.getItem('rol_empleado');
      console.log('El id del usuario es: ', idUsuario);
      console.log('El id del empleado es: ', data.id_empleado);
      if (idUsuario === data.id_empleado || rolEmpleado === '3') {
        console.log('notificacion filtrada');

        this.filtrarNotificaciones( data);
        this.desplegarNotificaciones(data.titulo, data.mensaje);
        this.notificacionesSinLeer++;
      }
    });

  }

  desplegarNotificaciones(titulo: string, mensaje: string) {
    if ("Notification" in window) {

      // Pide permiso para mostrar notificaciones
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          let direccionIcono = 'assets/image/notificacion.png';
          if (titulo.includes('creó')) {
            direccionIcono = 'assets/image/notificacion-icon.png';
          } else if (titulo.includes('preparación')) {
            direccionIcono = 'assets/image/notificacion-icon3.png';
          } else if (titulo.includes('completó')) {
            direccionIcono = 'assets/image/notificacion-icon2.png';
          } else if (titulo.includes('canceló')) {
            direccionIcono = 'assets/image/notificacion-icon5.webp';
          } else if (titulo.includes('sirvió')) {
            direccionIcono = 'assets/image/notificacion-icon4.png';
          }
          const notification = new Notification(titulo, {
            body: mensaje,
            icon: direccionIcono // Asegúrate de que tienes un icono en esta ruta
          });

          // Opcional: añade eventos a la notificación
          notification.onclick = () => {
            console.log("Notificación clicada");
            // Puedes añadir aquí código para hacer algo cuando se clicke en la notificación
          };
        } else {
          console.log("Notificación denegada");
        }
      }).catch((error) => {
        console.error("Error al pedir permiso para notificaciones: ", error);
      });
    } else {
      console.error("El navegador no soporta notificaciones.");
    }
  }

  filtrarNotificaciones(notificacion: Notificacion) {
    console.log('notificacion', notificacion);// comprobar que al recibir notficacion se filtra
    // Colocar una notificacione en la posicion 0 de la lista de notidicaciones
    this.notificaciones.unshift(notificacion);
    console.log('notificaciones', this.notificaciones);
    //quitar la ultima notificacion
    if (this.notificaciones.length > 5) {
      this.notificaciones.pop();
    }

  }

}