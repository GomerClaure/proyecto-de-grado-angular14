import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platillo } from 'src/app/modelos/Platillo';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  private BASE_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getPlatillos() {
    return this.http.get<Platillo>(`${this.BASE_URL}/platillos`);
  }

  storePlatillo(platillo: any) {
    return this.http.post<Platillo>(`${this.BASE_URL}/platillos`, platillo);
  }
}
