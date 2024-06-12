import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredServiceComponent } from './monitored-service.component';

describe('MonitoredServiceComponent', () => {
  let component: MonitoredServiceComponent;
  let fixture: ComponentFixture<MonitoredServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoredServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
