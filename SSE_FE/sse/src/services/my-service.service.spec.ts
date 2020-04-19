import { TestBed } from '@angular/core/testing';

import { MyServiceService } from './my-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SseService } from './sse.service';
import { MockEventSource } from './test/MockEventSource';



describe('MyServiceService', () => {
  let service: MyServiceService;
  let mockSSEService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SseService', ['getEventSource'])
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: SseService, useValue: spy },
        MyServiceService
      ]
    });
    service = TestBed.inject(MyServiceService);
    mockSSEService = TestBed.inject(SseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('MyService for SSE', () => {
  //   beforeEach(() => {
  //     window['EventSource'] = new MockEventSource('/mock');
  //     MockEventSource.lastInstance = null;
  //   });

  //   fit('should successfully return event', (done) => {
  //     mockSSEService.getEventSource.and.returnValue(MockEventSource);
  //     MockEventSource.lastInstance.onmessage({
  //       data: JSON.stringify('mock data')
  //     });
  //     service.getServerSentEvents('/mock').subscribe(
  //       (data) => {
  //         expect(data).toBeDefined();
  //         done();
  //       }
  //     )
  //   })
  // });
});
