import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';	
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  
  private BASE_URL = environment.backendUrl; 
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }


  private modalClosedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setModalClosed(value: boolean) {
    this.modalClosedSubject.next(value);
  }

  getModalClosed(): Observable<boolean> {
    return this.modalClosedSubject.asObservable();
  }
  // Obtiene todas las categorias de platillos
  getCategorias(){
    return this.http.get(`${this.BASE_URL}/menu/categoria`, { headers: this.headers });
  }
  // Obtiene una categoria de platillos por su id
  getCategoria(id: string){
    return this.http.get(`${this.BASE_URL}/menu/categoria/` + id);
  }

  // Guarda una nueva categoria de platillos
  saveCategoria(formData:FormData){
    return this.http.post(`${this.BASE_URL}/menu/categoria`, formData, { headers: this.headers });
  }

  // Actualiza una categoria de platillos
  updateCategoria(id: number, formData:FormData){
    return this.http.post(`${this.BASE_URL}/menu/categoria/` + id, formData, { headers: this.headers });
  }

  // Elimina una categoria de platillos
  deleteCategoria(id: number){
    return this.http.delete<any>(`${this.BASE_URL}/menu/categoria/${id}`, { headers: this.headers });
  }
  
}

