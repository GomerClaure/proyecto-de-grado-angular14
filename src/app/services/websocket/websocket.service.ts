import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { websocketConfig } from 'src/environments/environment';

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
    this.socket = new Pusher(websocketConfig.key, {
      cluster: websocketConfig.cluster,
      wsHost: websocketConfig.wsHost,
      wsPort: websocketConfig.wsPort,
      forceTLS: websocketConfig.forceTLS,
      //cambiar por wss si es cifrado
      enabledTransports: ['ws'],
      wssPort: websocketConfig.wssPort,
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
