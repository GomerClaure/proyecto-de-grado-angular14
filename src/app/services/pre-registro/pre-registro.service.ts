import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreRegistroService {
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }

  public savePreRegistro(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/pre-registro`, formData, { headers: this.headers });
  }
}
