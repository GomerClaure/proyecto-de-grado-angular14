import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescripcionPedidoService {
  descripciones: { id:number, descripcion: string }[] = [];
  index:number=0;
  constructor() { }
  platilloNombreSeleccionado(id:number){
    this.index=id;
  }
  addDescripcion(descripcion:string){
        // Asegúrate de que index tenga un valor válido
        if (this.index >= 0 && this.index < this.descripciones.length) {
          // Agrega la descripción y el ID al arreglo descripciones
          this.descripciones.push({ id: this.index, descripcion: descripcion });
        }
        console.log(descripcion)
        console.log(this.index)
  }  
  getDescripciones(){
    return this.descripciones;
  }
}
