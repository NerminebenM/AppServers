import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotsMaintenanceComponent } from './snapshots-maintenance.component';

describe('SnapshotsMaintenanceComponent', () => {
  let component: SnapshotsMaintenanceComponent;
  let fixture: ComponentFixture<SnapshotsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotsMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
