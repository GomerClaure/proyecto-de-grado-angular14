import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  platillosSeleccionados: { nombre: string; 
                            descripcion: string;
                            id:number;
                          }[] = [];
  descripcion:string='';
  constructor() { }
  agregarSeleccion(platillo: { nombre: string; descripcion: string;id:number }) {
    this.platillosSeleccionados.push(platillo);
  }
  guardarPedido(listaDescripciones: { id: number; descripcion: string; }[]) {
    this.platillosSeleccionados.forEach((platilloSeleccionado) => {
      const descripcion = listaDescripciones.find((desc: { id: number; descripcion: string; }) => desc.id === platilloSeleccionado.id)?.descripcion;
      // Si se encuentra una descripción correspondiente, añádela al platillo seleccionado
      if (descripcion) {
        platilloSeleccionado.descripcion = descripcion;
      }
    });
  }
  }

 