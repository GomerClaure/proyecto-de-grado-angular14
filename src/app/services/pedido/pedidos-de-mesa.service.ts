import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosDeMesaService {
  private pedidosMesaSubject = new BehaviorSubject<{ pedidos: any[], nombreMesa: string }>({ pedidos: [], nombreMesa: '' });
  pedidosMesa$ = this.pedidosMesaSubject.asObservable();

  constructor() { }

  setPedidosDeMesa(pedidos: any[], nombreMesa: string) {
    this.pedidosMesaSubject.next({ pedidos, nombreMesa });
  }
}
