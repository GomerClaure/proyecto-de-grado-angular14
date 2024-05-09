import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    const canal = this.webSocketService.listen('pedido');
    canal.bind('CrearPedido',(data: any) => {
      console.log(data);
    });
  }

}
