import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  platillosSeleccionados: string[] = [];

  constructor() { }

  agregarSeleccion(categoria: string) {
    this.platillosSeleccionados.push(categoria);
  }
  limpiarSelecciones(){
    this.platillosSeleccionados = [];
  }

}
 