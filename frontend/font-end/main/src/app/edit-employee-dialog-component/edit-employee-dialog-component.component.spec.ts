import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeDialogComponentComponent } from './edit-employee-dialog-component.component';

describe('EditEmployeeDialogComponentComponent', () => {
  let component: EditEmployeeDialogComponentComponent;
  let fixture: ComponentFixture<EditEmployeeDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
