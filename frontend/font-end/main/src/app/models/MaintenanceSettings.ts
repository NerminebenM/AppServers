import { Repository } from "./Repository";

// src/app/models/maintenance-settings.model.ts
export class MaintenanceSettings {
  id?: number;
  optimizeIndexesOlderThanDays: number;
  closeIndexesOlderThanDays: number;
  deleteIndexesOlderThanDays: number;
  repositoryToStoreSnapshots: string;
  deleteSnapshotsOlderThan: string;
  repositories?: Repository[];
  settingName?: string;
  settingValue?: string;
  description?: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  clusterId?: number; // Ajoutez cette ligne si nécessaire
}
