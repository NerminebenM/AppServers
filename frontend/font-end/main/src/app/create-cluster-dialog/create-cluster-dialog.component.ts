// create-cluster-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClusterService } from '../services/cluster.service';
import { Cluster } from '../models/Cluster';

@Component({
  selector: 'app-create-cluster-dialog',
  templateUrl: './create-cluster-dialog.component.html',
  styleUrls: ['./create-cluster-dialog.component.scss']
})
export class CreateClusterDialogComponent {
  cluster: Cluster = new Cluster();

  constructor(
    private dialogRef: MatDialogRef<CreateClusterDialogComponent>,
    private clusterService: ClusterService
  ) { }

  onSave(): void {
    this.clusterService.createCluster(this.cluster).subscribe(
      () => {
        this.dialogRef.close('saved');
      },
      (error) => {
        console.error('Error creating cluster', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
