import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {

  private platillosSubject = new BehaviorSubject<any[]>([]);
  private idPlatilloSubject = new BehaviorSubject<any>(null); 
  platillos$ = this.platillosSubject.asObservable();
  idPlatillo$ =this.idPlatilloSubject.asObservable();

  constructor() { }

  setPlatillos(platos: any[]) {
    this.platillosSubject.next(platos);
  } 
  setIdPedido(id:any){
     this.idPlatilloSubject.next(id);
  }
  getIdPedido(){ 
    return this.idPlatillo$;
  }
  
}
