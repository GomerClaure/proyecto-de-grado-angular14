import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';	
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from 'src/app/modelos/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  
  private BASE_URL = environment.backendUrl; 
  private categoriaSubject: BehaviorSubject<{accion:string,categoria:Categoria }> ;

  constructor(private http: HttpClient) { 
    this.categoriaSubject = new BehaviorSubject<{accion:string,categoria:Categoria }>( {accion:'',categoria:{}as Categoria});
  }


  //la accion es crear, editar o eliminar
  categoriaEvento(accion:string,categoria:Categoria ) {
    this.categoriaSubject.next({accion: accion, categoria:categoria});
  }

  getCategoriaEventos(): Observable<{accion:string,categoria:Categoria }> {
    return this.categoriaSubject.asObservable();
  }

 getCategorias(idRestaurante: any) {
  return this.http.get(`${this.BASE_URL}/menu/categoriaRestaurante/${idRestaurante}`);
}
  // Obtiene una categoria de platillos por su id
  getCategoria(id: string){
    return this.http.get(`${this.BASE_URL}/menu/categoria/` + id);
  }

  // Guarda una nueva categoria de platillos
  saveCategoria(formData:FormData){
    return this.http.post(`${this.BASE_URL}/menu/categoria`, formData );
  }

  // Actualiza una categoria de platillos
  updateCategoria(id: number, formData:FormData){
    return this.http.post(`${this.BASE_URL}/menu/categoria/` + id, formData);
  }

  // Elimina una categoria de platillos
  deleteCategoria(id: number){
    return this.http.delete<any>(`${this.BASE_URL}/menu/categoria/${id}`);
  }
  
}

