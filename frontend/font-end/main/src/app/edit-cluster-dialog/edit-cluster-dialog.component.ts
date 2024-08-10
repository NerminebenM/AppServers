// src/app/clusters/edit-cluster-dialog/edit-cluster-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClusterService } from '../services/cluster.service';
import { Cluster } from '../models/Cluster';

@Component({
  selector: 'app-edit-cluster-dialog',
  templateUrl: './edit-cluster-dialog.component.html',
  styleUrls: ['./edit-cluster-dialog.component.scss']
})
export class EditClusterDialogComponent implements OnInit {
  clusterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clusterService: ClusterService,
    public dialogRef: MatDialogRef<EditClusterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cluster
  ) { }

  ngOnInit(): void {
    this.clusterForm = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description]
    });
  }

  onSave(): void {
    if (this.clusterForm.valid) {
      const updatedCluster: Cluster = {
        ...this.data,
        ...this.clusterForm.value
      };
      this.clusterService.updateCluster(updatedCluster.id!, updatedCluster).subscribe(
        () => this.dialogRef.close('saved'),
        (error) => console.error('Error updating cluster', error)
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
