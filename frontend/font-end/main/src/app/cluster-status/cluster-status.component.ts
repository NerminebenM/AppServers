import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cluster-status',
  templateUrl: './cluster-status.component.html',
  styleUrls: ['./cluster-status.component.scss']
})
export class ClusterStatusComponent implements OnInit {
  indices = [];
  clusterStatistics: any;
  clusterHealth: any;
  userRole: string = ''; // Add a property for the user role

  constructor(private serverService: ServerService,private userService: UserService) { }

  ngOnInit(): void {
    this.loadIndices();
    this.loadClusterStatistics();
    this.loadClusterHealth();
    this.userRole = this.userService.getUserType();

  }

  loadIndices(): void {
    this.serverService.getIndices().subscribe(data => {
      this.indices = data;
    });
  }
  loadClusterStatistics(): void {
    this.serverService.getClusterStatistics().subscribe(data => {
      this.clusterStatistics = data;
    });
  }

  loadClusterHealth(): void {
    this.serverService.getClusterHealth().subscribe(data => {
      this.clusterHealth = data;
    });
  }

  closeIndex(index: any): void {
    this.serverService.closeIndex(index.id).subscribe(() => {
      console.log('Closing index', index);
      this.loadIndices();
    });
  }

  deleteIndex(index: any): void {
    this.serverService.deleteIndex(index.id).subscribe(() => {
      console.log('Deleting index', index);
      this.loadIndices();
    });
  }
}
