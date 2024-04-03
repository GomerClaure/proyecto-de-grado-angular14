import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  platillosSeleccionados: { nombre: string; descripcion: string; }[] = [];

  constructor() { }

  getpedido(){
    return this.platillosSeleccionados;
  }

  agregarSeleccion(platillo: { nombre: string; descripcion: string; }) {
    this.platillosSeleccionados.push(platillo);
  }

  limpiarSelecciones() {
    this.platillosSeleccionados = [];
  }
}
 