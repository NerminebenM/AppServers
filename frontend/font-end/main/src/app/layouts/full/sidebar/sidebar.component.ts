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
  navItems: NavItem[] = []; // Initialisez avec un tableau vide
  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();

  constructor(public navService: NavService ,private userService :UserService) {}

  ngOnInit(): void {
    this.navItems = this.getDefaultNavItems();
    this.dataSource.data = this.navItems;
  }

  getDefaultNavItems(): NavItem[] {
    const userType = this.userService.getUserType();
    let dashboardRoute = '/admin-overview';

    console.log('UserType:', userType);

    if (userType === 'admin') {
      dashboardRoute = '/admin';
    } else if (userType === 'moderator') {
      dashboardRoute = '/mod';
    }

    console.log('Dashboard Route:', dashboardRoute);

    return [
      { navCap: 'Home' },
      { displayName: 'Dashboard', iconName: 'dashboard', route: dashboardRoute },
      { navCap: 'Quick View' },
     // { displayName: 'Users and teams', iconName: 'group', route: 'menu/employees' },
     // { displayName: 'Server', iconName: 'storage', route: '/menu/server' },
      { displayName: 'User Management', iconName: 'visibility', route: '/menu/employees' },
     // { displayName: 'Bridges', iconName: 'bridge', route: '/bridges' },
      { displayName: 'Operations Center', iconName: 'settings', route: '/snapshots-maintenance' },
      { displayName: 'Cluster Status', iconName: 'desktop_windows', route: '/cluster-status' },
      { displayName: 'Instance Status', iconName: 'error', route: '/instance-status' },
      { displayName: 'Manage Servers', iconName: 'error_outline', route: '/menu/server' },
    //  { displayName: 'All Service Problems', iconName: 'report_problem', route: '/monitored-services' },
      { displayName: 'Add Log Source', iconName: 'report', route: '/add-log-source' },
      { displayName: 'Network Outages', iconName: 'wifi_off', route: '/network-outages' },
      { navCap: 'Details' },
      { displayName: 'Service Detail', iconName: 'info', route: '/monitored-services' },
      /*{ displayName: 'Host Detail', iconName: 'dns', route: '/host-detail' },
      { displayName: 'Hostgroup Summary', iconName: 'group_work', route: '/hostgroup-summary' },
      { displayName: 'Hostgroup Overview', iconName: 'view_quilt', route: '/hostgroup-overview' },
      { displayName: 'Hostgroup Grid', iconName: 'grid_on', route: '/hostgroup-grid' },
      { displayName: 'Servicegroup Summary', iconName: 'summary', route: '/servicegroup-summary' },
      { displayName: 'Servicegroup Overview', iconName: 'view_list', route: '/servicegroup-overview' },
      { displayName: 'Servicegroup Grid', iconName: 'grid_view', route: '/servicegroup-grid' },
      { displayName: 'BPI', iconName: 'show_chart', route: '/bpi' },
      { displayName: 'Metrics', iconName: 'bar_chart', route: '/metrics' },*/
      { navCap: 'Graphs' },
     /* { displayName: 'Performance Graphs', iconName: 'insert_chart', route: '/performance-graphs' },
      { displayName: 'Graph Explorer', iconName: 'explore', route: '/graph-explorer' },
      { navCap: 'Maps' },
      { displayName: '8bmap', iconName: 'map', route: '/8bmap' },
      { displayName: 'Google Map', iconName: 'map', route: '/google-map' },
      { displayName: 'Hypermap', iconName: 'map', route: '/hypermap' },
      { displayName: 'Minemap', iconName: 'map', route: '/minemap' },
      { displayName: 'Nagvis', iconName: 'map', route: '/nagvis' },
      { displayName: 'Network Status Map', iconName: 'network_check', route: '/network-status-map' },
      { displayName: 'Legacy Network Status Map', iconName: 'network_locked', route: '/legacy-network-status-map' },*/
      { navCap: 'Incident Management' },
      { displayName: 'Latest Alerts', iconName: 'notifications_active', route: '/latest-alerts' },
      /*{ displayName: 'Acknowledgements', iconName: 'check_circle', route: '/acknowledgements' },
      { displayName: 'Scheduled Downtime', iconName: 'schedule', route: '/scheduled-downtime' },
      { displayName: 'Mass Acknowledge', iconName: 'done_all', route: '/mass-acknowledge' },
      { displayName: 'Recurring Downtime', iconName: 'update', route: '/recurring-downtime' },*/
      { displayName: 'Notifications', iconName: 'notifications', route: '/notifications' },
      { navCap: 'Monitoring Process' },
      { displayName: 'Process Info', iconName: 'info', route: '/process-info' },
      { displayName: 'Performance', iconName: 'speed', route: '/performance' },
      { displayName: 'Event Log', iconName: 'event', route: '/event-log' },
    ];

  }
}
