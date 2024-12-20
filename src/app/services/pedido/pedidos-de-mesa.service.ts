import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PedidosPorMesa } from 'src/app/modelos/PedidosMesa';

@Injectable({
  providedIn: 'root'
})
export class PedidosDeMesaService {
  private pedidosPorMesaSubject = new BehaviorSubject<PedidosPorMesa[]>([]); // BehaviorSubject para `pedidosPorMesa`
  
  private idPedido: number = 0;

  constructor() { }

  // Método para actualizar los pedidos
  setPedidosDeMesa(pedidos: PedidosPorMesa[]) {
    this.pedidosPorMesaSubject.next(pedidos);
  }

  // Getter para obtener el observable directamente
  get pedidosPorMesa$() {
    return this.pedidosPorMesaSubject.asObservable();
  }

  setIdPedido(id: number) {
    this.idPedido = id;
  }

  getIdpedido() {
    return this.idPedido;
  }
}
