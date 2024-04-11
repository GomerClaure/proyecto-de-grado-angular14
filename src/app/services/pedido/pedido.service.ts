import { Injectable } from '@angular/core';
import { Platillo } from 'src/app/modelos/Platillo';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  platillosSeleccionados: Platillo[] = [];
  descripcion:string='';
  platillosAGuardar:{platillo:Platillo,descripcion:string}[]=[];

  constructor() { }
  agregarSeleccion(platillo: Platillo) {
    this.platillosSeleccionados.push(platillo);
  }
  getPlatillosSeleccionados(){
    return this.platillosSeleccionados
  }
}
  

 