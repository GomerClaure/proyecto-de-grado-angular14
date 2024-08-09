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

  orders = [
    // hasta 10
    { id: 1, tipo: 'Para llevar', platillos: [{ nombre: 'Pizza', precio: 12 },{nombre: 'Lasagna', precio:25}] },
    { id: 2, tipo: 'Para local', platillos: [{ nombre: 'Pasta', precio: 15 }] },
    { id: 3, tipo: 'Para llevar', platillos: [{ nombre: 'Hamburguesa', precio: 10 }] },
    { id: 4, tipo: 'Para local', platillos: [{ nombre: 'Ensalada', precio: 8 }] },
    { id: 5, tipo: 'Para llevar', platillos: [{ nombre: 'Tacos', precio: 7 }] },
    { id: 6, tipo: 'Para local', platillos: [{ nombre: 'Sushi', precio: 20 }] },
    { id: 7, tipo: 'Para llevar', platillos: [{ nombre: 'Torta', precio: 5 }] },
    { id: 8, tipo: 'Para local', platillos: [{ nombre: 'Papas fritas', precio: 4 }] },
    { id: 9, tipo: 'Para llevar', platillos: [{ nombre: 'Hot dog', precio: 6 }] },
    { id: 10, tipo: 'Para local', platillos: [{ nombre: 'Pollo frito', precio: 9 }] }
  ];
  
  selectedOrder = this.orders[0]; // Pedido inicial seleccionado
  currentIndex = 0;

  selectOrder(order: any) {
    this.selectedOrder = order;
    this.currentIndex = this.orders.indexOf(order);
  }

  previousOrder() {
    this.currentIndex = (this.currentIndex - 1 + this.orders.length) % this.orders.length;
    this.selectedOrder = this.orders[this.currentIndex];
  }

  nextOrder() {
    this.currentIndex = (this.currentIndex + 1) % this.orders.length;
    this.selectedOrder = this.orders[this.currentIndex];
  }
  
}
