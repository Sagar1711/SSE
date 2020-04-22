import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
    
  }

  getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('connect', () => {
        console.log("Connected");
      });
      this.socket.on('process', (message) => {
        observer.next(message);
      });
      this.socket.on('error', (error) => {
        observer.error(error);
      });
      this.socket.on('connect_failed', (error) => {
        observer.error(error);
      });
      this.socket.on('reconnect_failed', (error) => {
        observer.error(
          `Reconnection attempts are exhausted, 
          Not able to connect to server.
          Current Connected Clients: ${this.socket.subscribersCounter}`
        );
      });
    });
  }

  getMessageFromEvent() {
    return this.socket
      .fromEvent<any>('process');
  }

  sendMessage(message) {
    console.log(message);
    this.socket.emit('message', message);
  }

}
