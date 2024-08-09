import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido, PedidosCocina } from 'src/app/modelos/PedidosMesa';

@Component({
  selector: 'app-mostrar-detalle-pedidos',
  templateUrl: './mostrar-detalle-pedidos.component.html',
  styleUrls: ['./mostrar-detalle-pedidos.component.scss']
})
export class MostrarDetallePedidosComponent implements OnInit {

  // @Input() pedidos: DetallePedido[] = [];
  @Input() errorMessage: string = '';
  @Input() pedidosP: PedidosCocina[] = [];
  @Input() pedidosMostrar: PedidosCocina[] = [];
  @Input() pedidosPreparacion: PedidosCocina[] = [];
  @Input() pedidosEnEspera: PedidosCocina[] = [];
  @Input() pedidosTerminado: PedidosCocina[] = [];
  // @Input() platillos: any[] = [];

  @Input() id_restaurante: number;
  @Input() id_empleado: number;
  @Input() id_pedido_detallado: number;

  gruposDePedidos: any[][] = [];

  constructor() {
    this.id_restaurante = 1;
    this.id_empleado = 1;
    this.id_pedido_detallado = 1;
  }

  ngOnInit(): void {
  }

  pedidos = [
    // hasta 10
    { id: 1, tipo: 'Para llevar', platillos: [{ nombre: 'Pizza', precio: 12 },{nombre: 'Lasagna', precio:25}] },
    { id: 2, tipo: 'Para local', platillos: [{ nombre: 'Pasta', precio: 15 }] },
    { id: 3, tipo: 'Para llevar', platillos: [{ nombre: 'Hamburguesa', precio: 10 }] },
    { id: 4, tipo: 'Para local', platillos: [{ nombre: 'Ensalada', precio: 8 }] },
    { id: 5, tipo: 'Para llevar', platillos: [{ nombre: 'Tacos', precio: 7 }] },
    { id: 6, tipo: 'Para local', platillos: [{ nombre: 'Sushi', precio: 20 }] },
    { id: 7, tipo: 'Para llevar', platillos: [{ nombre: 'Tortas', precio: 10 }] },
    { id: 8, tipo: 'Para local', platillos: [{ nombre: 'Pozole', precio: 12 }] },
    { id: 9, tipo: 'Para llevar', platillos: [{ nombre: 'Tostadas', precio: 5 }] },
    { id: 10, tipo: 'Para local', platillos: [{ nombre: 'Tamales', precio: 8 }] },
  ];
  
  indicePedidoActual = 0; // Índice del pedido actualmente visible
  maximoMiniaturasVisibles = 5;
  pedidoSeleccionado: any = this.pedidos[0];

  get pedidosVisibles() {
    const totalPedidos = this.pedidos.length;
    const mitadVisible = Math.floor(this.maximoMiniaturasVisibles / 2);
    
    let inicio = (this.indicePedidoActual - mitadVisible + totalPedidos) % totalPedidos;
    let fin = (inicio + this.maximoMiniaturasVisibles) % totalPedidos;

    if (totalPedidos <= this.maximoMiniaturasVisibles) {
      return this.pedidos;
    }

    if (fin <= inicio) {
      return this.pedidos.slice(inicio).concat(this.pedidos.slice(0, fin));
    }

    return this.pedidos.slice(inicio, fin);
  }

  seleccionarPedido(pedido: any) {
    this.pedidoSeleccionado = pedido;
    this.indicePedidoActual = this.pedidos.indexOf(pedido);
  }

  mostrarPedidoAnterior() {
    this.indicePedidoActual = (this.indicePedidoActual - 1 + this.pedidos.length) % this.pedidos.length;
    this.pedidoSeleccionado = this.pedidos[this.indicePedidoActual];
  }

  mostrarPedidoSiguiente() {
    this.indicePedidoActual = (this.indicePedidoActual + 1) % this.pedidos.length;
    this.pedidoSeleccionado = this.pedidos[this.indicePedidoActual];
  }
}
