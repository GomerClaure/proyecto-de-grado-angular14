import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {
  private pedidosSubject = new BehaviorSubject<{ evento: string, pedido: any } | null>(null);
  pedidos$ = this.pedidosSubject.asObservable();

  private pedidoDetalladoSource = new BehaviorSubject<number>(0); // Observa el id del pedido detallado
  pedidoDetallado$ = this.pedidoDetalladoSource.asObservable();


  constructor() { }
  
  actualizarPedidos(evento: string, pedido: any) {
    this.pedidosSubject.next({ evento, pedido });
  }

  actualizarPedidoDetallado(id: number) {
    this.pedidoDetalladoSource.next(id);
  }
}
