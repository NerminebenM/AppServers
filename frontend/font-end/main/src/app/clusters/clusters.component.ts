import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClusterService } from '../services/cluster.service';
import { Cluster } from '../models/Cluster';
import { CreateClusterDialogComponent } from '../create-cluster-dialog/create-cluster-dialog.component';
import { EditClusterDialogComponent } from '../edit-cluster-dialog/edit-cluster-dialog.component';
import { MaintenanceSettingsDialogComponent } from '../maintenance-settings-dialog/maintenance-settings-dialog.component';
import { UserService } from '../services/user.service';
import { MaintenanceSettings } from '../models/MaintenanceSettings';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit {
  clusters: Cluster[] = [];
  userRole: string = '';

  constructor(
    private clusterService: ClusterService,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userRole = this.userService.getUserType();
    this.getClusters();
  }

  getClusters(): void {
    this.clusterService.getAllClusters().subscribe(
      (data: Cluster[]) => {
        this.clusters = data;
      },
      (error) => {
        console.error('Error fetching clusters', error);
      }
    );
  }

  openCreateClusterDialog(): void {
    const dialogRef = this.dialog.open(CreateClusterDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.getClusters();
      }
    });
  }

  openEditClusterDialog(cluster: Cluster): void {
    const dialogRef = this.dialog.open(EditClusterDialogComponent, {
      width: '400px',
      data: cluster
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.getClusters();
      }
    });
  }

  deleteCluster(id: number): void {
    this.clusterService.deleteCluster(id).subscribe(
      () => {
        this.getClusters();
      },
      (error) => {
        console.error('Error deleting cluster', error);
      }
    );
  }

  openMaintenanceSettingsDialog(cluster: Cluster): void {
    const dialogRef = this.dialog.open(MaintenanceSettingsDialogComponent, {
      width: '600px',
      data: { cluster } // Pass the cluster object directly
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assuming result contains maintenance settings and repositories
        const { maintenanceSettings, repositories } = result;

        if (maintenanceSettings) {
          this.clusterService.createOrUpdateMaintenanceSettings(cluster.id, maintenanceSettings).subscribe(
            updatedCluster => {
              this.clusters = this.clusters.map(c => c.id === updatedCluster.id ? updatedCluster : c);
            },
            error => {
              console.error('Error updating maintenance settings', error);
            }
          );
        }

        if (repositories) {
          this.clusterService.addOrUpdateRepositories(maintenanceSettings.id, repositories).subscribe(
            updatedCluster => {
              this.clusters = this.clusters.map(c => c.id === updatedCluster.id ? updatedCluster : c);
            },
            error => {
              console.error('Error updating repositories', error);
            }
          );
        }
      }
    });
  }
}
