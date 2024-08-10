// src/app/models/cluster.model.ts

import { MaintenanceSettings } from "./MaintenanceSettings";

export class Cluster {
  id?: number;
  name?: string;
  description?: string;
  maintenanceSettings?: MaintenanceSettings; // Assurez-vous que ce modèle est défini correctement

  // Ajoutez d'autres propriétés si nécessaire
}
