import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: Pusher;
  // channel: Channel;
  constructor() {
    // this.loadPusherJs();
    
    // this.channel = this.socket.subscribe('pedido');
    // this.listenAllEvents();
  }

  iniciarConexion() {
    this.closeConnection();
    this.socket = new Pusher(environment.websocketConfig.key, {
      cluster: environment.websocketConfig.cluster,
      wsHost: environment.websocketConfig.wsHost,
      wsPort: environment.websocketConfig.wsPort,
      forceTLS: environment.websocketConfig.forceTLS,
      //cambiar por wss si es cifrado
      enabledTransports: ['ws'],
      wssPort: environment.websocketConfig.wssPort,
      // authEndpoint: 'http://localhost:8000/broadcasting/auth',
      // auth: {
      //   headers: {
      //    'Authorization': 'Bearer ' + sessionStorage.getItem('token_access'),
      //    "Access-Control-Allow-Origin": "*"
      //   }
      // }

    })
  }
   
  listen(channel: string): Channel{
    return this.socket.subscribe(channel);
  }
  listenAllEventsPedidos(id_restaurante:number): Channel{
    let channel = this.socket.subscribe('pedido'+id_restaurante);
    return channel;
  }

  listenAllEvents(channelName: string): Channel{
    let channel = this.socket.subscribe(channelName);
    // channel.bind_global((eventName: string, data: any) => {
    //   console.log(`Received event '${eventName}' with data:`, data);
    // });
    return channel;
  }

  closeConnection() {
    if (this.socket)
      //si ya se desconecto entonces no desconectar
      if (this.socket.connection.state === 'connected'){
        this.socket.disconnect();
      }
  }

}
