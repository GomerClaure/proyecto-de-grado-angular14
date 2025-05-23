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
  addDescripcion(descripcion: string) {
    if (!descripcion.trim()) {
      return false; // Retorna falso si la descripción está vacía
  }
    if (this.index >= 0) {
        const descripcionExistente = this.descripciones.find(desc => desc.id === this.index);
        if (descripcionExistente) {
            descripcionExistente.descripcion = descripcion;
        } else {
            this.descripciones.push({ id: this.index, descripcion: descripcion });
        }
        console.log(this.descripciones);
    }
    console.log(descripcion);
    console.log(this.index);
    // Restablecer el índice después de agregar la descripción
    this.index = 0;
    return true
}
  getDescripciones(){
    return this.descripciones; 
} 
limpiarDescripciones() {
  // Limpiar la lista de descripciones
  this.descripciones = [];
}
}
 