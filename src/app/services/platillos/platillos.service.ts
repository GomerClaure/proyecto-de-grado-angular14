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
    // 'Content-Type': 'multipart/form-data'
  };


  constructor(private http: HttpClient) { }

  getPlatillos() {
    return this.http.get<any>(`${this.BASE_URL}/menu/platillo`, { headers: this.headers });
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
}
