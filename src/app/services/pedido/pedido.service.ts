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
  pedidoMesa:any[]=[];
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
  getPedidos() {
    return this.http.get<any>(`${this.BASE_URL}/pedidos`, { headers: this.headers });
  }
  deletePedido(id:number){
    return this.http.delete<any>(`${this.BASE_URL}/pedidos/${id}`, { headers: this.headers });
  }
}
  

  