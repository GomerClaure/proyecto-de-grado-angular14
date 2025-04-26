import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  private BASE_URL = environment.backendUrl;


  constructor(private http: HttpClient) { }

  getPlatillos(idRestaurante:any) {
    console.log('Esta obteniendo platillos')
    return this.http.get<any>(`${this.BASE_URL}/menu/platillos/${idRestaurante}`);
  }
  getPlatillosMenu(idRestaurante: string) {
    return this.http.get<any>(`${this.BASE_URL}/menu/pedido/platillos/${idRestaurante}`);
  }
  storePlatillo(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/menu/platillo`, formData);
  }

  updatePlatillo(formData: FormData, id: number) {
    return this.http.post<any>(`${this.BASE_URL}/menu/platillo/${id}`, formData);
  }

  showPlatillo(id: number) {
    return this.http.get<any>(`${this.BASE_URL}/menu/platillo/${id}`);
  }

  deletePlatillo(id: number) {
    return this.http.delete<any>(`${this.BASE_URL}/menu/platillo/${id}`);
  }

  validarNombre(nombre: string, id_restaurante: string) {
    // enviar parmetros al backend
    return this.http.get<any>(`${this.BASE_URL}/menu/platillo/validar/nombre/${id_restaurante}?nombre=${nombre}`);
  }
}
