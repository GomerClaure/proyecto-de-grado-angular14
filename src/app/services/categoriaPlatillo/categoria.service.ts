import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';	
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

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token_access');
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      throw new Error('No access token found in sessionStorage');
    }
  }

  setModalClosed(value: boolean) {
    this.modalClosedSubject.next(value);
  }

  getModalClosed(): Observable<boolean> {
    return this.modalClosedSubject.asObservable();
  }
  
 getCategorias(idRestaurante: any) {
  return this.http.get(`${this.BASE_URL}/menu/categoriaRestaurante/${idRestaurante}`, { headers: this.getHeaders() });
}
  // Obtiene una categoria de platillos por su id
  getCategoria(id: string){
    return this.http.get(`${this.BASE_URL}/menu/categoria/` + id, { headers: this.headers });
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

