import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/modelos/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ModalEliminarCategoriaService {
  private idCategoria:number =0;
  private categoriaLista:Categoria[]=[];

  idCategoriaModal(){
    return this.idCategoria;
  }

  listaCategorias(){
    return this.categoriaLista;
  }

  openModal(id:number,categorias:Categoria[]){
    this.idCategoria=id;
    this.categoriaLista=categorias;
  }

  constructor() { }
}
