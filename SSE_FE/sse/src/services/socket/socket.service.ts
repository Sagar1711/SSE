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
      this.socket.on('process', (message) => {
        observer.next(message);
      });
    });
  }

  sendMessage(message) {
    console.log(message);
    this.socket.emit('message', message);
  }

}
