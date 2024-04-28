import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ModalEditarCategoriaService {

  private categoria: Categoria;
  constructor() { 
    this.categoria = {id: 0, nombre: '', imagen: ''};
  }

  getCategoria(){
    return this.categoria;
  } 

  openModal(categoria: Categoria){
    this.categoria.id = categoria.id;
    this.categoria.nombre = categoria.nombre;
    this.categoria.imagen = categoria.imagen;
  }
}
