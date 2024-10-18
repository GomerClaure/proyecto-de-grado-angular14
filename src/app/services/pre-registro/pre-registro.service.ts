import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormularioPreRegistro } from 'src/app/modelos/FormularioPreRegistro';

@Injectable({
  providedIn: 'root'
})
export class PreRegistroService {
  private BASE_URL = environment.backendUrl;
  private headers: HttpHeaders;
  private solicitudFormSubject: BehaviorSubject<FormularioPreRegistro>;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token_access')
    });
    this.solicitudFormSubject = new BehaviorSubject<FormularioPreRegistro>({}as FormularioPreRegistro);
  }

  setPreRegistroSeleccionado(formulario: FormularioPreRegistro){
    this.solicitudFormSubject.next(formulario);
  }

  getPreRegistro():  Observable<FormularioPreRegistro>{
    return this.solicitudFormSubject.asObservable();
  }

  public getPreRegistros() {
    return this.http.get<any>(`${this.BASE_URL}/pre-registros`, { headers: this.headers });
  }

  public savePreRegistro(formData: FormData) {
    return this.http.post<any>(`${this.BASE_URL}/pre-registro`, formData, { headers: this.headers });
  }

  public actualizarEstadoPreRegistro(preRegistroId: number, estado: string, motivoRechazo?: string) {

    let params = new HttpParams()
      .set('pre_registro_id', preRegistroId.toString())
      .set('estado', estado);
    
    if (estado === 'rechazado' && motivoRechazo) {
      params = params.set('motivo_rechazo', motivoRechazo);
    }

    return this.http.put<any>(`${this.BASE_URL}/pre-registro/confirmar`, null, {
      headers: this.headers,
      params: params
    });
  }

}

