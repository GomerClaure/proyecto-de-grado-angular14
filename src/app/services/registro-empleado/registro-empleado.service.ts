import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpleadoService {
  private BASE_URL = environment.backendUrl;

  constructor(private http: HttpClient) { }

  public storeEmpleado(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token_access')
    });
     console.log('lo que se esta mandadndo',formData);
    return this.http.post<any>(`${this.BASE_URL}/empleado`, formData, { headers });
  }
}
