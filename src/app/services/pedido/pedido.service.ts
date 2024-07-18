import { Injectable } from '@angular/core';
import { Platillo } from 'src/app/modelos/Platillo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService { 
  private BASE_URL = environment.backendUrl;
  private headers = {
    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
  };

  platillosSeleccionados: Platillo[] = [];
  descripcion: string = '';
  pedidoMesa: any[] = [];
  platillosAGuardar: { platillo: Platillo, descripcion: string }[] = [];

  // BehaviorSubject para manejar la lista de pedidos
  private pedidosSubject = new BehaviorSubject<any[]>([]);
  pedidos$ = this.pedidosSubject.asObservable();

  constructor(private http: HttpClient) { }

  agregarSeleccion(platillo: Platillo) {
    this.platillosSeleccionados.push(platillo);
  }

  getPlatillosSeleccionados() {
    return this.platillosSeleccionados;
  }

  storePedido(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/pedido`, formData, { headers: this.headers });
  }

  limpiarSeleccion() {
    this.platillosSeleccionados = [];
  }

  getPedidos(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/pedidos`, { headers: this.headers }).pipe(
      tap(pedidos => {
        console.log('Pedidos obtenidos:', pedidos);
        this.pedidosSubject.next(pedidos.pedidos); // Asegúrate de que el formato de los datos es correcto
      })
    );
  }

  cambiarEstadoPedido(idPedido: string, idRestaurante: string, idEstado: string): Observable<any> {
    const body = {
      id_pedido: idPedido,
      id_estado: idEstado,
      id_restaurante: idRestaurante
    };
    return this.http.put<any>(`${this.BASE_URL}/plato-pedido/estado`, body, { headers: this.headers }).pipe(
      tap(() => {
        // Volver a cargar los pedidos y emitir la lista actualizada
        this.getPedidos().subscribe();
      })
    );
  }
}
