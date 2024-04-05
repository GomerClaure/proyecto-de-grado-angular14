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
  guardarPedido(listaDescripciones: { id: number; descripcion: string; }[]) {
    // Limpiamos platillosAGuardar para evitar duplicados si la función se llama varias veces
    this.platillosAGuardar = [];

    this.platillosSeleccionados.forEach((platilloSeleccionado, index) => {
      const descripcion = listaDescripciones.find(desc => desc.id === index)?.descripcion || '';
      this.platillosAGuardar.push({ platillo: platilloSeleccionado, descripcion });
    });

    console.log(this.platillosAGuardar);
  }
  }

 