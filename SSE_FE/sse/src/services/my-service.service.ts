import { Injectable, NgZone } from '@angular/core';
import { SseService } from './sse.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private _zone: NgZone, private _sseService: SseService, private _http: HttpClient) { }

  getServerSentEvents(url: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = this._sseService.getEventSource(url);
      eventSource.onopen = event => {
        console.log("Connection Open");
        console.log(event);
      }
      eventSource.onmessage =  event => {
        observer.next(event);
      };

      eventSource.onerror = error => {
        if (eventSource.readyState === 0) {
          eventSource.close();
          observer.complete();
        } else {
          observer.error('Eventsource error: ' + error);
        }
      };
      
    });
  }

  getData(url: string) {
    return this._http.get(url);
  }
}
