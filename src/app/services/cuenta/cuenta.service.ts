import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private BASE_URL = environment.backendUrl; 
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }

  private modalClosedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token_access');
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      throw new Error('No access token found in sessionStorage');
    }
  }

  saveDatos(razonSocial:string,nit:string){
     console.log("guardado",razonSocial,nit);
  }
}
