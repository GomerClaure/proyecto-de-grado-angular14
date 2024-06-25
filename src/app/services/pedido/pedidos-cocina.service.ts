import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {

  private platillosSubject = new BehaviorSubject<any[]>([]);
  platillos$ = this.platillosSubject.asObservable();
  private idPedido:string='';
  private estPedidoSubject = new BehaviorSubject<string>('');
  estPedido$ = this.estPedidoSubject.asObservable();

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
  
    getEstado() {
      return this.estPedidoSubject.getValue();
    }

  
}
