export class MockEventSource {
  static lastInstance: MockEventSource
  constructor(url: string) {
    MockEventSource.lastInstance = this;
  }
  onmessage: (message: any) => any;
}