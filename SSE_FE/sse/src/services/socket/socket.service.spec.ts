import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';

describe('SocketService', () => {
  let service: SocketService;
  let spySocket;

  beforeEach(() => {
    spySocket = jasmine.createSpyObj('Socket', ['on']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Socket, useValue: spySocket }
      ]
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should call getMessage', () => {
    const data = {
      data: "message"
    };
    spySocket.on.and.returnValue(data);
    let test_result$;
    test_result$ = service.getMessages().subscribe();
    expect(test_result$).toBeInstanceOf(Subscriber);
  });
});
