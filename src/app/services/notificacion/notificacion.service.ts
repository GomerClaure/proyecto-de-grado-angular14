import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }

  public getNotificacionesTodas() {
    let id_restaurante = sessionStorage.getItem('id_restaurante')||'0';
    let params = new HttpParams()
      .set('id_restaurante', id_restaurante);
    return this.http.get<any>(`${this.BASE_URL}/notificaciones`, { headers: this.headers, params: params });
  }
  public getNotificaciones(cantidad: number) {
    if (this.headers.Authorization.includes('null')) {
      this.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token_access');
    }
    let id_restaurante = sessionStorage.getItem('id_restaurante')||'0';
    let params = new HttpParams()
      .set('id_restaurante', id_restaurante)
      .set('cantidad', cantidad.toString());

    return this.http.get<any>(`${this.BASE_URL}/notificaciones/cantidad`, { headers: this.headers, params: params });
  }
//   {
//     "id_notificaciones":[5],
//     "id_restaurante":1

// }
  public marcarLeida(ids : number[],id_restaurante:number){
    let body = {
      id_notificaciones:ids,
      id_restaurante:id_restaurante
    }
    return this.http.put<any>(`${this.BASE_URL}/notificaciones/leidas`,body,{headers:this.headers});
  }
}
