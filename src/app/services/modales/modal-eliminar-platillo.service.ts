import { Injectable } from '@angular/core';
import { Platillo } from 'src/app/modelos/Platillo';

@Injectable({
  providedIn: 'root'
})
export class ModalEliminarPlatilloService {
  private idPlatillo: number = 0;
  private platillosLista: Platillo[] = [];

  constructor() { }

  idPlatilloModal() {
    return this.idPlatillo;
  }

  listaPlatillos() {
    return this.platillosLista;
  }

  openModal(id: number, platillos: Platillo[]) {
    this.idPlatillo = id;
    this.platillosLista = platillos;
  }
 
}
