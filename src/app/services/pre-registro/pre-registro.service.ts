import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreRegistroService {
  private BASE_URL = environment.backendUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token_access')
    });
  }

  public getPreRegistros() {
    return this.http.get<any>(`${this.BASE_URL}/pre-registros`, { headers: this.headers });
  }

  public savePreRegistro(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/pre-registro`, formData, { headers: this.headers });
  }
}

