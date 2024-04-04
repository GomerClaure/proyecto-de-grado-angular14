import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescripcionPedidoService {
  descripciones: { platillo: string, descripcion: string }[] = [];
  platilloSeleccionado: string = '';

  constructor() { }

  setDescripcion(platillo: string, descripcion: string) {
    const index = this.descripciones.findIndex(item => item.platillo === platillo);
    if (index !== -1) {
      this.descripciones[index].descripcion = descripcion;
    } else {
      this.descripciones.push({ platillo, descripcion });
    }
  }

  platilloNombreSeleccionado(id:number){
    console.log(id);
    //this.platilloSeleccionado=id;
  }

  getplatilloSeleccionado(){
    return this.platilloSeleccionado;
  }

  getDescripcion(platillo: string) {
    const descripcionObj = this.descripciones.find(item => item.platillo === platillo);
    return descripcionObj ? descripcionObj.descripcion : '';
  }
}
