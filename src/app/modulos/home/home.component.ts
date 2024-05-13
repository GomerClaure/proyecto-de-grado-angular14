import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    const canal = this.webSocketService.listen('pedido');
    canal.bind('CrearPedido',(data: any) => {
      console.log(data);
    });
  }

}
