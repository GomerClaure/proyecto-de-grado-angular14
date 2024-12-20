import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platillo } from 'src/app/modelos/Platillo';

@Injectable({
  providedIn: 'root'
})
export class ModalEliminarPlatilloService {
  private idPlatillo: number = 0;
  private platillosLista: Platillo[] = [];
  private nombreplatilloSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  idPlatilloModal() {
    return this.idPlatillo;
  }
 
  getNombrePlatillo$() {
    return this.nombreplatilloSubject.asObservable();
  }
  listaPlatillos() {
    return this.platillosLista;
  }

  openModal(id: number, platillos: Platillo[],nombre:string) {
    this.idPlatillo = id;
    this.platillosLista = platillos;
    this.nombreplatilloSubject.next(nombre);
  }
 
}
