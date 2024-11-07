import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { Notificacion } from 'src/app/modelos/Notificacion';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, OnDestroy {
  private unloadHandler = (event: BeforeUnloadEvent) => {
    console.log('La página se está refrescando o cerrando');
    localStorage.setItem('conexionWebSocket', 'false');
    this.webSocketService.closeConnection();
  };
  public notificaciones: Notificacion[];
  public notificacionesSinLeer: number;
  public fotoPerfil: string;
  private idRestaurante: number;
  public isMenuCollapsed = true;
  public isLoggedIn = false;
  private backendUrl = environment.backendStorageUrl;
  private sessionSubscription: Subscription;
  public maxIntentos: number = 3;
  public nombreRestaurante: string;
  public tipoEstablecimiento: string;

  constructor(private sessionService: SessionService, private router: Router,
    private notificacionService: NotificacionService, private webSocketService: WebsocketService,
    private cocinaService: PedidosCocinaService) {
    this.notificaciones = [];
    this.idRestaurante = 0;
    this.notificacionesSinLeer = 0;
    this.fotoPerfil = '';
    this.nombreRestaurante = '';
    this.tipoEstablecimiento = '';
    this.sessionSubscription = {} as Subscription;
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.unloadHandler);
    this.sessionSubscription = this.sessionService.authStatus$.subscribe(status => {
      this.fotoPerfil = this.backendUrl + sessionStorage.getItem('foto_perfil') || '';
      this.nombreRestaurante = sessionStorage.getItem('nombre_restaurante') || 'Restaurante';
      this.tipoEstablecimiento = sessionStorage.getItem('tipo_establecimiento') || '';
      if (this.nombreRestaurante === '') {

      }
      this.isLoggedIn = status;
      // const conexionWebSocket = localStorage.getItem('conexionWebSocket');
      if (this.isLoggedIn) {
        this.idRestaurante = parseInt(sessionStorage.getItem('id_restaurante') || '0');
        // if (conexionWebSocket !== 'true') {
          if (sessionStorage.getItem('tipo') === 'Empleado') {
            console.log('Iniciando conexión websocket');
            this.webSocketService.iniciarConexion();
            localStorage.setItem('conexionWebSocket', 'true');
            if (sessionStorage.getItem('rol_empleado') === '3' || sessionStorage.getItem('rol_empleado') === '2') {
              this.suscribirseEventosDePedido();
            } else {
              this.suscribirNotificacion();
            }
          // }
        }

        let sesionComoEmpleado = sessionStorage.getItem('tipo') === 'Empleado';
        if (sesionComoEmpleado) {
          this.notificacionService.getNotificaciones(5).subscribe(
            (data) => {
              this.notificaciones = data.notificaciones;
              this.notificacionesSinLeer = data.notificacionesSinLeer;
              //console.log(this.notificaciones);
            },
            (error) => {
              console.error(error);
            }
          );
        }

      }
      this.intentarRecuperarNombre(0);
    });
  }

  ngOnDestroy(): void {

    localStorage.setItem('conexionWebSocket', 'false');
    this.webSocketService.closeConnection();
    window.removeEventListener('beforeunload', this.unloadHandler);
  }

  marcarLeida() {
    let cantidad = this.notificaciones.length;
    // [1, 2, 3, 4, 5] por ejemplo
    console.log('Cantidad de notificaciones a marcar como leídas: ', cantidad);
    let ids: any[] = [];
    for (let i = 0; i < cantidad; i++) {
      console.log(i);
      console.log(this.notificaciones[i].read_at )
      if (this.notificaciones[i].read_at === null || this.notificaciones[i].read_at === '') {
        ids.push(this.notificaciones[i].id);
        this.notificaciones[i].read_at = new Date();

      }
    }
    if (cantidad === 0) {
      ids.push('all');
      this.notificacionesSinLeer = 0;
    }
    console.log('ids', ids);
    if (ids.length > 0) {
      this.notificacionService.marcarLeida(ids, this.idRestaurante).subscribe(
        (data) => {
          //console.log(data);
          if (this.notificacionesSinLeer !== 0) {
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
  getRol() {
    return sessionStorage.getItem('rol_empleado');
  }
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  closeMenu() {
    this.isMenuCollapsed = true;
  }
  cerrarSesion() {
    this.webSocketService.closeConnection();
    localStorage.setItem('conexionWebSocket', 'false');
    this.sessionService.logout();
  }

  mostrarModalCategoria(): void {
    console.log("modal");
    this.router.navigateByUrl('/registrar/categoria');
  }

  irAMenu() {

    this.router.navigateByUrl('/propietario/vista-menu/'+this.idRestaurante);
  }


  suscribirseEventosDePedido() {
    this.webSocketService.listenAllEvents('pedido' + this.idRestaurante).bind_global((eventName: string, data: any) => {
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
      if (idEmpleado === data.id_empleado) {
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

  fotoPerfilError() {
    this.fotoPerfil = '';
  }

  intentarRecuperarNombre(intentosRealizados: number) {
    this.nombreRestaurante = sessionStorage.getItem('nombre_restaurante') || 'Restaurante';
    this.tipoEstablecimiento = sessionStorage.getItem('tipo_establecimiento') || '';
    if (this.nombreRestaurante === 'Restaurante' && intentosRealizados < this.maxIntentos) {
      // Esperar 1 segundo antes de volver a intentar
      setTimeout(() => {
        console.log('intento ' + intentosRealizados)
        this.intentarRecuperarNombre(intentosRealizados + 1);
      }, 1000);
    }
  }
}
