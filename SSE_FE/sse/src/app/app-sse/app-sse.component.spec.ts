import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSseComponent } from './app-sse.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppSseComponent', () => {
  let component: AppSseComponent;
  let fixture: ComponentFixture<AppSseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSseComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
