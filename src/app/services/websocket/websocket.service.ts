import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { websocketConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Pusher;
  // channel: Channel;
  constructor() {
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
      //     'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.content
      //   }
      // }

    })
    // this.channel = this.socket.subscribe('chat');
    // this.listenAllEvents();
  }
  listen(channel: string): Channel{
    return this.socket.subscribe(channel);
  }
  // listenAllEvents() {
  //   this.channel.bind_global((eventName: string, data: any) => {
  //     console.log(`Received event '${eventName}' with data:`, data);
  //   });
  // }

}
