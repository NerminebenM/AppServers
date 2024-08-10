import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SnapshotsMaintenanceService } from '../services/snapshots-maintenance.service';
import { MaintenanceSettings } from '../models/MaintenanceSettings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maintenance-settings-dialog',
  templateUrl: './maintenance-settings-dialog.component.html',
  styleUrls: ['./maintenance-settings-dialog.component.scss']
})
export class MaintenanceSettingsDialogComponent {
  maintenanceSettings: MaintenanceSettings;
  clusterId: number;

  constructor(
    private maintenanceService: SnapshotsMaintenanceService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MaintenanceSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadMaintenanceSettings(data.cluster.id);
    this.clusterId = data.clusterId;
  }

  ngOnInit(): void {
    this.maintenanceSettings = {
      optimizeIndexesOlderThanDays: 30,
      closeIndexesOlderThanDays: 30,
      deleteIndexesOlderThanDays: 30,
      repositoryToStoreSnapshots: '',
      deleteSnapshotsOlderThan: '30'
    };
  }

  loadMaintenanceSettings(clusterId: number): void {
    this.maintenanceService.getMaintenanceSettingsById(clusterId)
      .subscribe(settings => {
        this.maintenanceSettings = settings;
      });
  }

  saveSettings(): void {
    this.maintenanceService.saveMaintenanceSettings(this.maintenanceSettings)
      .subscribe(
        (response) => {
          console.log('Settings saved successfully:', response);
          this.snackBar.open('Settings saved successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true); // Close the dialog and pass `true` to indicate success
        },
        (error) => {
          console.error('Error saving settings:', error);
          this.snackBar.open('Error saving settings. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
