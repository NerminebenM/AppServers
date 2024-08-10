import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cluster } from '../models/Cluster';
import { MaintenanceSettings } from '../models/MaintenanceSettings';
import { Repository } from '../models/Repository';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {
  private apiUrl = 'http://localhost:8081/api/clusters';

  constructor(private http: HttpClient) { }

  getAllClusters(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(this.apiUrl);
  }

  getClusterById(id: number): Observable<Cluster> {
    return this.http.get<Cluster>(`${this.apiUrl}/${id}`);
  }

  createCluster(cluster: Cluster): Observable<Cluster> {
    return this.http.post<Cluster>(this.apiUrl, cluster);
  }

  updateCluster(id: number, cluster: Cluster): Observable<Cluster> {
    return this.http.put<Cluster>(`${this.apiUrl}/${id}`, cluster);
  }

  deleteCluster(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createOrUpdateMaintenanceSettings(clusterId: number, maintenanceSettings: MaintenanceSettings): Observable<Cluster> {
    return this.http.post<Cluster>(`${this.apiUrl}/${clusterId}/maintenance-settings`, maintenanceSettings);
  }

  addOrUpdateRepositories(maintenanceSettingsId: number, repositories: Repository[]): Observable<Cluster> {
    return this.http.post<Cluster>(`${this.apiUrl}/maintenance-settings/${maintenanceSettingsId}/repositories`, repositories);
  }
  getClusterStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }

}
