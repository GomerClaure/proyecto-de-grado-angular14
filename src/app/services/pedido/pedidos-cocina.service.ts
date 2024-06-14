import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosCocinaService {

  private platillosSubject = new BehaviorSubject<any[]>([]);
  platillos$ = this.platillosSubject.asObservable();

  constructor() { }

  setPlatillos(platos: any[]) {
    this.platillosSubject.next(platos);
  } 
}
