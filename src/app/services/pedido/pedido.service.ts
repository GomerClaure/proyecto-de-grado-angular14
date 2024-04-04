import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  platillosSeleccionados: { nombre: string; descripcion: string;}[] = [];
  pedidos: { nombre: string; descripcion: string; }[] = [];

  constructor() { }
  getpedido(){
    return this.platillosSeleccionados;
  }
  agregarPedido(pedido: { nombre: string; descripcion: string; }) {
    this.pedidos.push(pedido);
  }
  agregarSeleccion(platillo: { nombre: string; descripcion: string; }) {
    this.platillosSeleccionados.push(platillo);
  }
  limpiarSelecciones() {
    this.platillosSeleccionados = [];
  }
}
 