import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogSourceComponent } from './add-log-source.component';

describe('AddLogSourceComponent', () => {
  let component: AddLogSourceComponent;
  let fixture: ComponentFixture<AddLogSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLogSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLogSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
