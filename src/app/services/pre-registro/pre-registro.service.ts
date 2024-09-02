import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreRegistroService {
  private BASE_URL = environment.backendUrl;

  constructor(private http: HttpClient) { }

  public savePreRegistro(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token_access')
    });

    return this.http.post<any>(`${this.BASE_URL}/pre-registro`, formData, { headers });
  }
}

