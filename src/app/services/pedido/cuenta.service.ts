import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private cuentaSubject = new BehaviorSubject<any[]>([]);
  cuenta$ = this.cuentaSubject.asObservable();
  idCuenta:string='';
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  constructor(private http: HttpClient) { }
  saveId(id:any){
    this.idCuenta=id;
  }
  storeDatosCuenta(idCuenta:any, formData: FormData): any {
    console.log(formData, idCuenta);
    return this.http.post<any>(`${this.BASE_URL}/cuenta/store/${idCuenta}`, formData, { headers: this.headers });
}
}
