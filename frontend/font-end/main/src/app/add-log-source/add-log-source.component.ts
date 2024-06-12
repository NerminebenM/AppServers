import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-log-source',
  templateUrl: './add-log-source.component.html',
  styleUrls: ['./add-log-source.component.scss']
})
export class AddLogSourceComponent {
  constructor(private router: Router) {}
  sidebarOpen = true; // état de la barre latérale

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  navigateToAddLogSource() {
    this.router.navigate(['/add-log-source']);
  }

  // Les éléments de navigation pour la barre latérale
  navItems = [
    { displayName: 'Add Log Source', route: '/add-log-source', iconName: 'add', navCap: 'Configure' },
    { displayName: 'Configuration Editor', route: '/menu/server', iconName: 'edit' },
    { displayName: 'Linux', route: '/linux', iconName: 'linux', navCap: 'System Logs' },
    { displayName: 'Windows', route: '/windows', iconName: 'windows' },
    { displayName: 'Network Device', route: '/monitored-services', iconName: 'router' },
    { displayName: 'Apache', route: '/apache', iconName: 'web', navCap: 'Application Logs' },
    { displayName: 'IIS Web Server', route: '/iis', iconName: 'web' },
    { displayName: 'MySQL', route: '/mysql', iconName: 'storage' },
    { displayName: 'PHP', route: '/php', iconName: 'code' },
    { displayName: 'Linux Files', route: '/linux-files', iconName: 'insert_drive_file', navCap: 'File Monitoring' },
    { displayName: 'Windows Files', route: '/windows-files', iconName: 'insert_drive_file' },
    { displayName: 'Import From File', route: '/import-from-file', iconName: 'file_upload', navCap: 'Archived Logs' }
  ];
}
