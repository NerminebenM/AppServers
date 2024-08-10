import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClusterDialogComponent } from './edit-cluster-dialog.component';

describe('EditClusterDialogComponent', () => {
  let component: EditClusterDialogComponent;
  let fixture: ComponentFixture<EditClusterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClusterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClusterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
