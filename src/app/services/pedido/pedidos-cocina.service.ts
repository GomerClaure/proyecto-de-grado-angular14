import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {
  private pedidosSubject = new BehaviorSubject<{ evento: string, pedido: any } | null>(null);
  pedidos$ = this.pedidosSubject.asObservable();


  constructor() { }
  
  actualizarPedidos(evento: string, pedido: any) {
    this.pedidosSubject.next({ evento, pedido });
  }
}
