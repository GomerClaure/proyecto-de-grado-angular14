import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platillo } from 'src/app/modelos/Platillo';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  private BASE_URL = 'http://localhost:8000/api';
  // private csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
    // 'Content-Type': 'multipart/form-data'
  };


  constructor(private http: HttpClient) { }

  getPlatillos() {
    return this.http.get<Platillo>(`${this.BASE_URL}/platillos`);
  }

  storePlatillo(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/menu/platillo`, formData, { headers: this.headers });
  }
}
