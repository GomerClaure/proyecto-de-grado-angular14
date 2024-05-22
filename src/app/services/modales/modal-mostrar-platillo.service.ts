import { Injectable } from '@angular/core';
import { Platillo } from 'src/app/modelos/Platillo';

@Injectable({
  providedIn: 'root'
})
export class ModalMostrarPlatilloService {
 private platillo:any;
  constructor() {
    this.platillo = {nombre:'',imagen:'',descripcion:''};
   }

   getPlatillo() {
    return this.platillo;
  }
  
  openModal(platillo:Platillo){
    this.platillo.nombre = platillo.nombre;
    this.platillo.imagen = platillo.imagen;
    this.platillo.descripcion=platillo.descripcion;
  }
}
