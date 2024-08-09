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

  constructor(private pedidoService: PedidoService, private pedidoCocinaService: PedidosCocinaService) {
    this.id_restaurante = 0;
    this.id_empleado = 0;
    this.id_pedido_detallado = 0;
   }

  ngOnInit(): void {
    this.id_restaurante = +sessionStorage.getItem('id_restaurante')!;
    this.id_empleado = +sessionStorage.getItem('id_empleado')!;
    this.obtenerPedidos();
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

  mostrarDetallePedido(): void {
    this.mostrarDetalle = true;
  }

  extractHour(datetime: string): string {
    return datetime.split(' ')[1]; // Extrae '15:05' de '2024-06-19 15:05:52'
  }

  ordenarPedidos(): void {
    this.pedidos.forEach(pedido => {
      const pedidoCocina: PedidosCocina = {
        id: pedido.id,
        numPedido: pedido.id,
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
    this.mostrarped(this.pedidosP);
  }

  mostrarped(p: PedidosCocina[]): void {
    this.pedidosMostrar = p;
  }

  mostrarTodos(){
    this.mostrarDetalle = false;
    this.mostrarped(this.pedidosP);
  }

  enPreparacion(): void {
    this.mostrarDetalle = false;
    this.mostrarped(this.pedidosPreparacion);
  }

  terminado(): void {
    this.mostrarDetalle = false;
    this.mostrarped(this.pedidosTerminado);
  }

  paraLlevar(): void {
    this.mostrarDetalle = false;
    this.mostrarped(this.pedidosP.filter(ped => ped.tipoPedido === 'llevar'));
  }

  paraAqui(): void {
    this.mostrarDetalle = false;
    this.mostrarped(this.pedidosP.filter(ped => ped.tipoPedido === 'local'));
  }

  verPlatos(id: number, estadoP: string, tipo: string): void {
    const pedido = this.pedidosP.find(p => p.numPedido === id);
    this.platillos = pedido ? pedido.platos : [];
    console.log(this.pedidosP);
    this.pedidoCocinaService.setPedidoOrdenado(this.platillos, id, estadoP, tipo);
    // console.log(this.pedidoCocinaService.getPlatillos());
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
