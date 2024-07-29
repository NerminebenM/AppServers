import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav-item/nav-item';
import { NavService } from 'src/app/services/nav.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = [];
  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();

  constructor(public navService: NavService, private userService: UserService) {}

  ngOnInit(): void {
    this.updateNavItems();
  }

  updateNavItems(): void {
    const userType = this.userService.getUserType();
    console.log('UserType:', userType); // Vérifiez la valeur du type d'utilisateur

    let navItems: NavItem[] = [
      { navCap: 'Home' },
      { displayName: 'Dashboard', iconName: 'dashboard', route: '/admin-overview' },
      { navCap: 'Quick View' },
      { displayName: 'Manage Servers', iconName: 'error_outline', route: '/menu/server' },
      { displayName: 'User Management', iconName: 'visibility', route: '/menu/employees' },
      { displayName: 'Cluster Status', iconName: 'desktop_windows', route: '/cluster-status' },
      { displayName: 'Instance Status', iconName: 'error', route: '/instance-status' },
      { displayName: 'Operations Center', iconName: 'settings', route: '/snapshots-maintenance' },
      { navCap: 'Details' },
      { displayName: 'Service Detail', iconName: 'info', route: '/monitored-services' },
      { navCap: 'Graphs' },
      { displayName: 'Graph Explorer', iconName: 'explore', route: '/admin' },
      { navCap: 'Incident Management' },
      { displayName: 'Notifications', iconName: 'notifications', route: '/notifications' }
    ];

    if (userType === 'mod') {
      navItems = navItems.filter(item => !['Dashboard', 'User Management', 'Operations Center'].includes(item.displayName));
      console.log('Filtered navItems for moderator:', navItems); // Log filtered items
    } else {
      console.log('NavItems for other user types:', navItems); // Log items for other users
    }

    this.navItems = navItems;
    this.dataSource.data = this.navItems;
  }

}
