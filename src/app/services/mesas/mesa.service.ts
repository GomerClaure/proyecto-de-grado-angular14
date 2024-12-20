import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private BASE_URL = environment.backendUrl; 
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };
  constructor(private http: HttpClient) {
   }

  getMesas(idRestaurante: string) {
    return this.http.get(`${this.BASE_URL}/restaurante/mesas/`+idRestaurante, { headers: this.headers });
  }
}
