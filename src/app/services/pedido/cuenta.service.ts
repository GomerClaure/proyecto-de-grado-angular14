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
  get idCuentaValue(): number | null {
    return this.idCuentaSubject.getValue();
  }
  storeDatosCuenta(formData: FormData): any {
    const idCuenta = this.idCuentaSubject.getValue();  // Obtener el último valor del idCuenta
    // quiero obtener el id_restaurante de la sessionStorage
    const id_restaurante = sessionStorage.getItem('id_restaurante');
    if (id_restaurante) {
      formData.append('id_restaurante', id_restaurante);  // Agregar el id_restaurante al FormData
    } else {
      console.error('No se encontró el id_restaurante en sessionStorage');
    }
    console.log('Formulario enviado con ID cuenta:', idCuenta, formData);
    return this.http.post<any>(`${this.BASE_URL}/cuenta/store/${idCuenta}`, formData, { headers: this.headers });
  }
  cerrarCuenta(id: number){
    return this.http.post<any>(`${this.BASE_URL}/cuenta/close/${id}`,null, { headers:this.headers});
  } 
  getCuenta(id: number) {
    return this.http.get<any>(`${this.BASE_URL}/show/cuenta/${id}`, { headers: this.headers });
  }
  getCuentasCerradas(id:number) {
    return this.http.get<any>(`${this.BASE_URL}/cuentas/cerradas/${id}`, { headers: this.headers });
  }

  getCuentasAbiertas(idRestaurante:number){
    return this.http.get<any>(`${this.BASE_URL}/cuentas/abiertas/${idRestaurante}`);

  }
}
