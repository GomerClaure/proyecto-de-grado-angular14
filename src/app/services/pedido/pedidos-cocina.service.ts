import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {

  private idPedido:string='';
  private platillosSubject = new BehaviorSubject<any[]>([]);
  platillos$ = this.platillosSubject.asObservable();
  private estPedidoSubject = new BehaviorSubject<string>('');
  estPedido$ = this.estPedidoSubject.asObservable();
  private tipoPedidoSubject = new BehaviorSubject<string>('');
  tipoPedido$ = this.tipoPedidoSubject.asObservable();

  constructor() { }
  setPedidoOrdenado(platos:any,Id:any,estado:string,tip:string) {
    this.platillosSubject.next(platos);
    this.idPedido=Id;
    this.estPedidoSubject.next(estado);
    this.tipoPedidoSubject.next(tip);
  }
  getEstado() {
      return this.estPedidoSubject.getValue();
    }
  getTipo(){
    return this.tipoPedidoSubject.getValue();
  }
  getIdPedido(){ 
    return this.idPedido;
    }
  getPlatillos(){
    return this.platillosSubject.getValue();
  }
}
