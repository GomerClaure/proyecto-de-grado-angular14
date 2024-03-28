import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';	
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private BASE_URL = environment.backendUrl; 
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }

  // Obtiene todas las categorias de platillos
  getCategorias(){

    return this.http.get(`${this.BASE_URL}/menu/categoria`, { headers: this.headers });
  }

  // Obtiene una categoria de platillos por su id
  getCategoria(id: string){
    return this.http.get(`${this.BASE_URL}/menu/categoria/` + id);
  }

  // Guarda una nueva categoria de platillos
  saveCategoria(nombre: any){
    return this.http.post(`${this.BASE_URL}/menu/categoria`, nombre, { headers: this.headers });
  }

  // Actualiza una categoria de platillos
  updateCategoria(id: string, categoria: any){
    return this.http.put(`${this.BASE_URL}/menu/categoria/` + id, categoria);
  }

  // Elimina una categoria de platillos
  deleteCategoria(id: string){
    return this.http.delete('http://localhost:3000/categoria/' + id);
  }
  
}

