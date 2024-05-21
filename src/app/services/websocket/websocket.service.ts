import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { websocketConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Pusher;
  channel: Channel;
  constructor() {
    // this.loadPusherJs();
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
    this.channel = this.socket.subscribe('pedido');
    this.listenAllEvents();
  }

  private async loadPusherJs() {
    const pusherModule = await import('pusher-js');
    this.socket = new pusherModule.default(websocketConfig.key, {
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
  listenAllEvents() {
    this.channel.bind_global((eventName: string, data: any) => {
      console.log(`Received event '${eventName}' with data:`, data);
    });
  }

}
