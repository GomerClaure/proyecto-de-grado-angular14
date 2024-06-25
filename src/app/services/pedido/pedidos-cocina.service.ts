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

  setPlatillos(platos: any[]) {
    this.platillosSubject.next(platos);
  } 
  setIdPedido(id:any){
     this.idPedido=id;
  }
  getIdPedido(){ 
    return this.idPedido;
    }
  setEstado(estado: string) {
      this.estPedidoSubject.next(estado);
      console.log(estado);
    }
  setTipo(tip:string){
      this.tipoPedidoSubject.next(tip);
  }
  getEstado() {
      return this.estPedidoSubject.getValue();
    }
  getTipo(){
    return this.tipoPedidoSubject.getValue();
  }

  
}
