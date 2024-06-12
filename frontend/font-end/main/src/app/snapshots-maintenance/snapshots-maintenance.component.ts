import { Component } from '@angular/core';

@Component({
  selector: 'app-snapshots-maintenance',
  templateUrl: './snapshots-maintenance.component.html',
  styleUrls: ['./snapshots-maintenance.component.scss']
})
export class SnapshotsMaintenanceComponent {
  isCreateRepositoryFormVisible = false;
  newRepository = { name: '', location: '' };

  showCreateRepositoryForm() {
    this.isCreateRepositoryFormVisible = true;
  }

  closeCreateRepositoryForm() {
    this.isCreateRepositoryFormVisible = false;
    this.newRepository = { name: '', location: '' };
  }

  addRepository() {

    console.log('New Repository:', this.newRepository);
    this.closeCreateRepositoryForm();
  }
}
