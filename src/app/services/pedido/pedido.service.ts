import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
   categoriasSeleccionadas: string[] = [];

  constructor() { }

  agregarSeleccion(categoria: string) {
    this.categoriasSeleccionadas.push(categoria);
  }

}
 