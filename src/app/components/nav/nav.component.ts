import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { Notificacion } from 'src/app/modelos/Notificacion';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public notificaciones: Notificacion[];
  public notificacionesSinLeer: number;
  private idRestaurante: number;

  constructor(private sessionService: SessionService, private router: Router,
    private notificacionService: NotificacionService, private webSocketService: WebsocketService,
    private cocinaService: PedidosCocinaService) {
    this.notificaciones = [];
    this.idRestaurante = 0;
    this.notificacionesSinLeer = 0;
  }

  ngOnInit(): void {
    // window.onload = () => {
    //   localStorage.setItem('conexionWebSocket', 'false');
    // };
    if (sessionStorage.getItem('token_access')) {
      
      // this.webSocketService.listenAllEvents('pedido');
      this.idRestaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
      const conexionWebSocket = localStorage.getItem('conexionWebSocket');
      console.log('El valor de la conexión websocket es: ', conexionWebSocket);
      if (conexionWebSocket !== 'true') {
        console.log('Iniciando conexión websocket');
        localStorage.setItem('conexionWebSocket', 'true');
        if(sessionStorage.getItem('tipo') === 'Empleado'){
          this.webSocketService.iniciarConexion();
          if(sessionStorage.getItem('rol_empleado') === '3'){
            this.suscribirseEventosDePedido();
          }else{
            this.suscribirNotificacion();
          }
        }
      }

      let sesionComoEmpleado = sessionStorage.getItem('tipo') === 'Empleado';

      if (sesionComoEmpleado) {
        this.notificacionService.getNotificaciones(5).subscribe(
          (data) => {
            this.notificaciones = data.notificaciones;
            this.notificacionesSinLeer = data.notificacionesSinLeer;
            console.log(this.notificaciones);
          },
          (error) => {
            console.error(error);
          }
        );
      }

    }

  }

  ngOnDestroy(): void {
    console.log('Cerrando conexión websocket');
    localStorage.setItem('conexionWebSocket', 'false');
    this.webSocketService.closeConnection();
  }

  marcarLeida(cantidad: number) {
    // [1, 2, 3, 4, 5] por ejemplo
    console.log('Cantidad de notificaciones a marcar como leídas: ', cantidad);
    let ids: any[] = [];
    for (let i = 0; i < cantidad; i++) {
      if (this.notificaciones[i].read_at === null) {
        ids.push(this.notificaciones[i].id);
        this.notificaciones[i].read_at = new Date();

      }
    }
    if (cantidad === 0) {
      ids.push('all');
      this.notificacionesSinLeer = 0;
    }
   console.log('ids', ids);
   if(ids.length > 0){
     this.notificacionService.marcarLeida(ids, this.idRestaurante).subscribe(
       (data) => {
         console.log(data);
         if(this.notificacionesSinLeer !== 0){
          this.notificacionesSinLeer -= ids.length;
         }
         
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
      return sessionStorage.getItem('tipo') === 'Empleado';

  }
  getRol(){
     return sessionStorage.getItem('rol_empleado');
  }

  cerrarSesion() {
    this.webSocketService.closeConnection();
    this.sessionService.logout();
  }

  mostrarModalCategoria(): void {
    console.log("modal");
    this.router.navigateByUrl('/registrar/categoria');
  }

  irAMenu() {
    this.router.navigateByUrl('/menu/vista/1');
  }

  suscribirseEventosDePedido(){
    this.webSocketService.listenAllEvents('pedido'+this.idRestaurante).bind_global((eventName: string, data: any) => { 
      console.log(`Received event '${eventName}' with data:`, data);
      this.cocinaService.actualizarPedidos(eventName, data);

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

  suscribirNotificacion() {
    this.webSocketService.listenAllEvents('notificaciones' + this.idRestaurante).bind('Notificacion', (data: any) => {
     
      let idEmpleado = parseInt(sessionStorage.getItem('id_empleado') || '0');
      // let rolEmpleado = sessionStorage.getItem('rol_empleado');
      console.log('El id del usuario es: ', idEmpleado);
      console.log('El id del empleado es: ', data.id_empleado);
      if (idEmpleado === data.id_empleado ) {
          console.log('notificacion filtrada');
          this.desplegarNotificaciones(data.titulo, data.mensaje);
          this.notificacionesSinLeer++;
          if (this.notificaciones.length >= 5) {
            //colocar la notificacion en la primera posicion
            this.notificaciones.pop();
            
          }
          this.notificaciones.unshift(data);

      }
    });

  }
}
