import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {

  private platillosSubject = new BehaviorSubject<any[]>([]);
  platillos$ = this.platillosSubject.asObservable();
  private idPedido:string='';

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
  
}
