import { Component, OnInit } from '@angular/core';
import { MaintenanceSettings, Repository, SnapshotsMaintenanceService } from '../services/snapshots-maintenance.service';

@Component({
  selector: 'app-snapshots-maintenance',
  templateUrl: './snapshots-maintenance.component.html',
  styleUrls: ['./snapshots-maintenance.component.scss']
})
export class SnapshotsMaintenanceComponent implements OnInit {
  maintenanceSettings: MaintenanceSettings;
  newRepository: Repository = { name: '', location: '' };
  isCreateRepositoryFormVisible = false;
  enableMaintenance: boolean = true;
  settingsList: MaintenanceSettings[] = [];
  displayedColumns: string[] = [
    'id',
    'optimizeIndexesOlderThanDays',
    'closeIndexesOlderThanDays',
    'deleteIndexesOlderThanDays',
    'repositoryToStoreSnapshots',
    'deleteSnapshotsOlderThan'
  ];

  constructor(private maintenanceService: SnapshotsMaintenanceService) {}

  ngOnInit(): void {
    this.loadAllMaintenanceSettings();
  }

  showCreateRepositoryForm() {
    this.isCreateRepositoryFormVisible = true;
  }

  closeCreateRepositoryForm() {
    this.isCreateRepositoryFormVisible = false;
    this.newRepository = { name: '', location: '' };
  }

  addRepository() {
    if (this.maintenanceSettings && this.maintenanceSettings.id) {
      this.maintenanceService.addRepository(this.maintenanceSettings.id, this.newRepository)
        .subscribe(
          (updatedSettings) => {
            console.log('Repository added successfully:', updatedSettings);
            this.maintenanceSettings = updatedSettings;
            this.closeCreateRepositoryForm();
          },
          (error) => {
            console.error('Error adding repository:', error);
          }
        );
    }
  }

  deleteRepository(repositoryId: number) {
    if (this.maintenanceSettings && this.maintenanceSettings.id) {
      this.maintenanceService.deleteRepository(this.maintenanceSettings.id, repositoryId)
        .subscribe(
          (updatedSettings) => {
            console.log('Repository deleted successfully:', updatedSettings);
            this.maintenanceSettings = updatedSettings;
          },
          (error) => {
            console.error('Error deleting repository:', error);
          }
        );
    }
  }

  saveMaintenanceSettings() {
    this.maintenanceService.saveMaintenanceSettings(this.maintenanceSettings)
      .subscribe(
        (response) => {
          console.log('Settings saved successfully:', response);
          this.maintenanceSettings = response;
        },
        (error) => {
          console.error('Error saving settings:', error);
        }
      );
  }

  loadAllMaintenanceSettings() {
    this.maintenanceService.getAllMaintenanceSettings()
      .subscribe(
        (settings) => {
          console.log('Loaded maintenance settings:', settings);
          this.settingsList = settings;
          this.maintenanceSettings = settings[0]; // Assume you're interested in the first settings object
        },
        (error) => {
          console.error('Error loading maintenance settings:', error);
        }
      );
  }
}
