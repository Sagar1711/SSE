import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSseComponent } from './app-sse.component';
import { MyServiceService } from 'src/services/my-service.service';
import { of, throwError } from 'rxjs';

describe('AppSseComponent', () => {
  let component: AppSseComponent;
  let fixture: ComponentFixture<AppSseComponent>;
  let myServiceSpy;
  let mock_data;

  beforeEach(() => {
    myServiceSpy = jasmine.createSpyObj(['getServerSentEvents']);
    
    TestBed.configureTestingModule({
      declarations: [ AppSseComponent ],
      providers: [
        { provide: MyServiceService, useValue: myServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mock_data = {
      data: JSON.stringify({
        data: 'mock data'
      })
    };
    fixture = TestBed.createComponent(AppSseComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have test data observable', () => {
    myServiceSpy.getServerSentEvents.and.returnValue(of(mock_data));
    fixture.detectChanges();
    expect(component.updated_process).toBeDefined();
    expect(component.updated_process['data']).toEqual('mock data');
  });

  it('should recieve an error from  service', () => {
    let mock_error = {
      error: JSON.stringify({
        error: 'mock event error'
      })
    };
    myServiceSpy.getServerSentEvents.and.returnValue(throwError(mock_error));
    spyOn(component, 'handleError');
    fixture.detectChanges();
    expect(component.handleError).toHaveBeenCalled();
  });
});
