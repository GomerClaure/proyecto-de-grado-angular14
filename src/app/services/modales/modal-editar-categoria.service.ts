import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from 'src/app/modelos/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ModalEditarCategoriaService {

  private categoria: Categoria;
  constructor() { 
    this.categoria = {id: 0, nombre: '', imagen: ''};
  }
  private modalClosedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setModalClosed(value: boolean) {
    this.modalClosedSubject.next(value);
  }

  getModalClosed(): Observable<boolean> {
    return this.modalClosedSubject.asObservable();
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
