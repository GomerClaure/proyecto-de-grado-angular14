import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private idCuentaSubject = new BehaviorSubject<number | null>(null);  // Observable para el id de cuenta
  idCuenta$ = this.idCuentaSubject.asObservable();  // Exponemos el observable para poder suscribirnos
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };
  constructor(private http: HttpClient) { }
  saveId(id: number) {
    this.idCuentaSubject.next(id); 
    console.log('ID cuenta actualizado:', id); 
  }
  storeDatosCuenta(formData: FormData): any {
    const idCuenta = this.idCuentaSubject.getValue();  // Obtener el último valor del idCuenta
    console.log('Formulario enviado con ID cuenta:', idCuenta, formData);
    return this.http.post<any>(`${this.BASE_URL}/cuenta/store/${idCuenta}`, formData, { headers: this.headers });
  }
}
