import { Injectable } from '@angular/core';
import { Platillo } from 'src/app/modelos/Platillo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };
  platillosSeleccionados: Platillo[] = [];
  descripcion:string='';
  platillosAGuardar:{platillo:Platillo,descripcion:string}[]=[];

  constructor(private http: HttpClient) { }
  agregarSeleccion(platillo: Platillo) {
    this.platillosSeleccionados.push(platillo);
  }
  getPlatillosSeleccionados(){
    return this.platillosSeleccionados
  }
  storePedido(formData:FormData) {
    return this.http.post<any>(`${this.BASE_URL}/pedido`, formData, { headers: this.headers });
  }
  limpiarSeleccion() {
    // Limpiar la lista de platillos seleccionados
    this.platillosSeleccionados = [];
  }
}
  

  