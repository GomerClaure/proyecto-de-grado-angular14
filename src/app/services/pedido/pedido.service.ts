import { Injectable } from '@angular/core';
import { Platillo } from 'src/app/modelos/Platillo';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
    this.platillosSeleccionados = [];
  }
  getPedidos(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/pedidos`, { headers: this.headers });
  }
  cambiarEstadoPedido( idPedido: string, idRestaurante: string, idEstado: string){
    const body = {
      id_pedido: idPedido,
      id_estado: idEstado,
      id_restaurante: idRestaurante
    };
    return this.http.put<any>(`${this.BASE_URL}/plato-pedido/estado`, body, { headers: this.headers });
  }
  }
  

  