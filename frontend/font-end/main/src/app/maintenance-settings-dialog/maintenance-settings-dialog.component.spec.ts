import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceSettingsDialogComponent } from './maintenance-settings-dialog.component';

describe('MaintenanceSettingsDialogComponent', () => {
  let component: MaintenanceSettingsDialogComponent;
  let fixture: ComponentFixture<MaintenanceSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceSettingsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
