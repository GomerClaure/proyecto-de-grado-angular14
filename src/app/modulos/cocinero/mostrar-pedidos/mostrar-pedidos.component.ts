import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.scss']
})
export class MostrarPedidosComponent implements OnInit {
  pedidos: any[] = [];
  private id_restaurante = sessionStorage.getItem('id_restaurante');

  constructor(private webSocketService: WebsocketService) {
    this.pedidos.push('Primer Cambio');
    this.pedidos.push('Segundo Cambio');
   }

  ngOnInit(): void {
    
    const canal = this.webSocketService.listen('pedido'+this.id_restaurante);
    canal.bind('PedidoCreado',(data: any) => {
      console.log(data);
      this.pedidos.push(data);
    });
  }

}
