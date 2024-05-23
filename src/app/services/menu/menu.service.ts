import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }

  public getMenu() {
    return this.http.get<any>(`${this.BASE_URL}/menu`, { headers: this.headers });
  }
  public getMenuById(id: number) {
    return this.http.get<any>(`${this.BASE_URL}/menu/${id}`, { headers: this.headers });
  }
  public saveMenu(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/menu`, formData, { headers: this.headers });
  } 
  public generarQr(direccion_url_menu: string) {
    return this.http.post<any>(`${this.BASE_URL}/menu/generar/qr`, {direccion_url_menu}, { headers: this.headers });
  }
}
