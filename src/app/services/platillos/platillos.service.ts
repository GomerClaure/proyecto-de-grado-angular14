import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  private BASE_URL = environment.backendUrl;
  // private csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };


  constructor(private http: HttpClient) { }

  getPlatillos(idRestaurante:any) {
    return this.http.get<any>(`${this.BASE_URL}/menu/platillo/${idRestaurante}`, { headers: this.headers });
  }
  getPlatillosMenu() {
    return this.http.get<any>(`${this.BASE_URL}/menu/pedido/platillos`, { headers: this.headers });
  }
  storePlatillo(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/menu/platillo`, formData, { headers: this.headers });
  }

  updatePlatillo(formData: FormData, id: number) {
    return this.http.post<any>(`${this.BASE_URL}/menu/platillo/${id}`, formData, { headers: this.headers });
  }

  showPlatillo(id: number) {
    return this.http.get<any>(`${this.BASE_URL}/menu/platillo/${id}`, { headers: this.headers });
  }

  deletePlatillo(id: number) {
    return this.http.delete<any>(`${this.BASE_URL}/menu/platillo/${id}`, { headers: this.headers });
  }
}
