import { TestBed } from '@angular/core/testing';

import { MyServiceService } from './my-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
