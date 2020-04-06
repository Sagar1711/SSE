import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor() { }
  /**
   * creates event source
   * @param url 
   */
  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
