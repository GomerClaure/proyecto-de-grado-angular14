import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescripcionPedidoService {
  descripcion: string = '';

  constructor() { }

  setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }

  getDescripcion() {
    return this.descripcion;
  }
}
