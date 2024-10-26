import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BASE_URL = environment.backendUrl;

  constructor(private http: HttpClient) { }

  public getMenu() {
    return this.http.get<any>(`${this.BASE_URL}/menu`);
  }
  public getMenuById(id: number) {
    return this.http.get<any>(`${this.BASE_URL}/menu/${id}`);
  }
  public saveMenu(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/menu`, formData);
  } 
  public generarQr(direccion_url_menu: string) {
    return this.http.post<any>(`${this.BASE_URL}/menu/generar/qr`, {direccion_url_menu});
  }
}
