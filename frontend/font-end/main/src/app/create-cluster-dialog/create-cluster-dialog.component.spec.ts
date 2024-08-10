import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClusterDialogComponent } from './create-cluster-dialog.component';

describe('CreateClusterDialogComponent', () => {
  let component: CreateClusterDialogComponent;
  let fixture: ComponentFixture<CreateClusterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClusterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClusterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
