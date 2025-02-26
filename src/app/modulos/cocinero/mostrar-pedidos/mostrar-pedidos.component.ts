import { Component, OnInit } from '@angular/core';
import { DetallePedido, PedidosCocina } from 'src/app/modelos/PedidosMesa';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { PedidosCocinaService } from 'src/app/services/pedido/pedidos-cocina.service';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.scss']
})
export class MostrarPedidosComponent implements OnInit {
  pedidos: DetallePedido[] = [];
  errorMessage: string = '';
  pedidosP: PedidosCocina[] = [];
  pedidosMostrar: PedidosCocina[] = [];
  pedidosPreparacion: PedidosCocina[] = [];
  pedidosEnEspera: PedidosCocina[] = [];
  pedidosTerminado: PedidosCocina[] = [];
  platillos: any[] = [];

  id_restaurante: number;
  id_empleado: number;
  id_pedido_detallado: number;
  mostrarDetalle: boolean = false;
  activeCategoria: number;

  constructor(private pedidoService: PedidoService, private cocinaService : PedidosCocinaService) {
    this.id_restaurante = 0;
    this.id_empleado = 0;
    this.id_pedido_detallado = 0;
    this.activeCategoria = 0;
   }

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
    // Suscribirse a los cambios en los pedidos
  this.cocinaService.pedidos$.subscribe(update => {
    console.log('Actualización de pedidos:', update);
    if (update) {
      const { evento, datos } = update;
      // Dependiendo del tipo de evento, maneja el pedido de manera diferente
      switch (evento) {
        case 'PedidoEnPreparacion':
          this.actualizarEstadoPedido(2, datos, 'En preparación');
          break;
        case 'PedidoServido':
          this.actualizarEstadoPedido(3, datos, 'Servido');
          break;
        case 'pedidoCancelado':
          this.eliminarPedidoDeLista(datos);
          break;
        case 'PedidoCreado':
          this.pedidosEnEspera.push(datos);
          this.pedidosP = [...this.pedidosEnEspera, ...this.pedidosPreparacion, ...this.pedidosTerminado];
          this.pedidoService.getPedidoPlatillos(datos.id, this.id_restaurante+'').subscribe(
            (response) => {
              console.log(response);
              this.pedidosP.forEach(ped => {
                if(ped.id == response.idPedido){
                  ped.platos = response.platos;
                }
              });
            },
            (error) => {
              this.errorMessage = 'Error al obtener los pedidos';
              console.error(error);
            }
          );

          this.mostrarped(0, this.pedidosP);
          var audio = document.getElementById('sonidoNotificacion') as HTMLAudioElement;
          audio?.play();
          break;
        default:
          console.warn(`Evento no manejado: ${evento}`);
      }
    }
  });

  this.cocinaService.pedidoDetallado$.subscribe(id => {
    console.log('Pedido detallado:', id);
    this.id_pedido_detallado = id;
  });
}
// Método para actualizar el estado del pedido y moverlo al final de la lista
actualizarEstadoPedido(idTabActivo: number, pedido: any, estado:string): void {
  var pedidoAnterior = this.pedidosP.find(p => p.id === pedido.idPedido);
  if(pedidoAnterior){
    if(pedidoAnterior.estado == 'En espera'){
      this.pedidosEnEspera = this.pedidosEnEspera.filter(p => p.id !== pedido.idPedido);
    }
    if(pedidoAnterior.estado == 'En preparación'){
      
      this.pedidosPreparacion = this.pedidosPreparacion.filter(p => p.id !== pedido.idPedido);
    }else if(pedidoAnterior.estado == 'Servido'){
      this.pedidosTerminado = this.pedidosTerminado.filter(p => p.id !== pedido.idPedido);
    }else{
      this.pedidosEnEspera = this.pedidosEnEspera.filter(p => p.id !== pedido.idPedido);
    }
    pedidoAnterior.estado = estado;
    if(estado == 'En preparación'){
      this.pedidosPreparacion.push(pedidoAnterior);
    }else if(estado == 'Servido'){
      this.pedidosTerminado.push(pedidoAnterior);
    } else{
      this.pedidosEnEspera.push(pedidoAnterior);
    }
    this.pedidosP = [...this.pedidosEnEspera, ...this.pedidosPreparacion, ...this.pedidosTerminado];
    this.mostrarped(idTabActivo, this.pedidosP);
  }
}

// Método para eliminar un pedido de su lista actual
eliminarPedidoDeLista(pedido: any): void {
  this.pedidosEnEspera = this.pedidosEnEspera.filter(p => p.id !== pedido.id);
  this.pedidosPreparacion = this.pedidosPreparacion.filter(p => p.id !== pedido.id);
  this.pedidosTerminado = this.pedidosTerminado.filter(p => p.id !== pedido.id);
}

  obtenerPedidos(): void {
    this.pedidoService.getPedidos(this.id_empleado, this.id_restaurante).subscribe(
      (response) => {
        console.log(response);
        this.pedidos = response.pedidos;
        this.ordenarPedidos();
      },
      (error) => {
        this.errorMessage = 'Error al obtener los pedidos';
        console.error(error);
      }
    );
  }

  mostrarDetallePedido(idTabActivo: number): void {
    this.mostrarDetalle = true;
    this.activeCategoria = idTabActivo
  }

  extractHour(datetime: string): string {
    return datetime.split(' ')[1]; // Extrae '15:05' de '2024-06-19 15:05:52'
  }

  ordenarPedidos(): void {
    this.pedidos.forEach(pedido => {
      const pedidoCocina: PedidosCocina = {
        id: pedido.id,
        mesa: pedido.cuenta.mesa.nombre,
        platos: pedido.platos,
        tipoPedido: pedido.tipo,
        hora: this.extractHour(pedido.fecha_hora_pedido),
        estado: pedido.estado.nombre
      };

      switch (pedido.id_estado) {
        case 1:
          this.pedidosEnEspera.push(pedidoCocina);
          break;
        case 2:
          this.pedidosPreparacion.push(pedidoCocina);
          break;
        case 4:
          this.pedidosTerminado.push(pedidoCocina);
          break;
        default:
          break;
      }
    });

    this.pedidosP = [...this.pedidosEnEspera, ...this.pedidosPreparacion, ...this.pedidosTerminado];

    console.log(this.pedidosP)

    this.mostrarped(0, this.pedidosP);
  }

  mostrarped(idActivo: number,p: PedidosCocina[]): void {
    this.pedidosMostrar = p;
    this.activeCategoria = idActivo;

  }

  mostrarTodos(idActive: number){
    this.mostrarDetalle = false;
    this.mostrarped(idActive, this.pedidosP);
  }

  enPreparacion(idActive: number): void {
    this.mostrarDetalle = false;
    this.activeCategoria = idActive;


    this.mostrarped(idActive, this.pedidosPreparacion);
  }

  terminado(idActive: number): void {
    this.mostrarDetalle = false;
    this.mostrarped(idActive, this.pedidosTerminado);
  }

  paraLlevar(idActive: number): void {
    this.mostrarDetalle = false;
    this.mostrarped(idActive, this.pedidosP.filter(ped => ped.tipoPedido === 'llevar'));
  }

  paraAqui(idActive: number): void {
    this.mostrarDetalle = false;
    this.mostrarped(idActive, this.pedidosP.filter(ped => ped.tipoPedido === 'local'));
  }

  verPlatos(id: number): void {
    this.id_pedido_detallado = id;
    this.cocinaService.actualizarPedidoDetallado(this.id_pedido_detallado);
    this.mostrarDetalle = true;
    this.activeCategoria = 1;

  }

  getButtonClass(estado: string): string {
    switch (estado) {
      case 'Servido':
        return 'btn btn-success';
      case 'En preparación':
        return 'btn btn-en-preparacion';
      default:
        return 'btn btn-en-cola';
    }
  }
}
