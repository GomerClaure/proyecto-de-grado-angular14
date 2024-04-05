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
    // Agregar los platillos seleccionados a la lista platillosAGuardar
    this.platillosSeleccionados.forEach(platilloSeleccionado => {
      this.platillosAGuardar.push({ platillo: platilloSeleccionado, descripcion: '' });
    });

    // Buscar descripciones correspondientes y agregarlas a platillosAGuardar
    this.platillosAGuardar.forEach(platilloAGuardar => {
      const descripcion = listaDescripciones.find(desc => desc.id === platilloAGuardar.platillo.id)?.descripcion;
      if (descripcion) {
        platilloAGuardar.descripcion = descripcion;
      }
    });
    console.log(this.platillosAGuardar);
  }
  }

 