import { Component, OnInit } from '@angular/core';
import { SnapshotsMaintenanceService } from '../services/snapshots-maintenance.service';
import { MaintenanceSettings } from '../models/MaintenanceSettings';
import { Repository } from '../models/Repository';

@Component({
  selector: 'app-snapshots-maintenance',
  templateUrl: './snapshots-maintenance.component.html',
  styleUrls: ['./snapshots-maintenance.component.scss']
})
export class SnapshotsMaintenanceComponent implements OnInit {
  maintenanceSettings: Partial<MaintenanceSettings> = {}; // Utiliser Partial
  newRepository: Repository = { name: '', location: '' };
  isCreateRepositoryFormVisible = false;
  enableMaintenance: boolean = true;
  settingsList: MaintenanceSettings[] = [];
  clusterId: number;

  displayedColumns: string[] = [
    'id',
    'optimizeIndexesOlderThanDays',
    'closeIndexesOlderThanDays',
    'deleteIndexesOlderThanDays',
    'repositoryToStoreSnapshots',
    'deleteSnapshotsOlderThan',
    'clusterId' // Ajouté pour afficher le Cluster ID
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
            this.loadAllMaintenanceSettings(); // Recharger les paramètres après ajout
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
            this.loadAllMaintenanceSettings(); // Recharger les paramètres après suppression
          },
          (error) => {
            console.error('Error deleting repository:', error);
          }
        );
    }
  }

  saveSettings(): void {
    if (this.maintenanceSettings) {
      this.maintenanceSettings.clusterId = this.clusterId; // Assigner le Cluster ID
      this.maintenanceService.saveMaintenanceSettings(this.maintenanceSettings as MaintenanceSettings)
        .subscribe(
          (response) => {
            console.log('Settings saved successfully:', response);
            // Logic to handle success
          },
          (error) => {
            console.error('Error saving settings:', error);
          }
        );
    } else {
      console.error('Maintenance settings are undefined.');
    }
  }

  loadAllMaintenanceSettings() {
    this.maintenanceService.getAllMaintenanceSettings()
      .subscribe(
        (settings) => {
          console.log('Loaded maintenance settings:', settings);
          this.settingsList = settings;
          if (settings.length > 0) {
            this.maintenanceSettings = settings[0]; // Assume you're interested in the first settings object
            this.clusterId = this.maintenanceSettings.clusterId;
          }
        },
        (error) => {
          console.error('Error loading maintenance settings:', error);
        }
      );
  }
}
