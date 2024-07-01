import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { AuthGuard } from './services/AuthGuard';
import { AppDashboardadminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AppChipsComponent } from './pages/ui-components/chips/chips.component';
import { AppListsComponent } from './pages/ui-components/lists/lists.component';
import { AppServerComponent } from './pages/ui-components/Server/server.component';
import { AddLogSourceComponent } from './add-log-source/add-log-source.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SnapshotsMaintenanceComponent } from './snapshots-maintenance/snapshots-maintenance.component';
import { ClusterStatusComponent } from './cluster-status/cluster-status.component';
import { InstanceStatusComponent } from './instance-status/instance-status.component';
import { AppDashboardmoderatorComponent } from './pages/dashboard-moderator/dashboard-moderator.component';
import { MonitoredServiceComponent } from './monitored-service/monitored-service.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpsComponent } from './helps/helps.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'help', component: HelpsComponent },
  {
    path: 'login',
    component: AppSideLoginComponent,
  },
  { path: 'user-profile', component: UserProfileComponent },

  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add-log-source', component: AddLogSourceComponent },
      { path: 'admin-overview', component: AdminOverviewComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'snapshots-maintenance', component: SnapshotsMaintenanceComponent },
      { path: 'cluster-status', component: ClusterStatusComponent },
      { path: 'instance-status', component: InstanceStatusComponent },
      { path: 'monitored-services', component: MonitoredServiceComponent },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'admin',
        component: AppDashboardadminComponent,
      },
      {
        path: 'mod',
        component: AppDashboardmoderatorComponent,
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/ui-components/ui-components.module').then((m) => m.MenuModule),
      },
      {
        path: 'extra',
        loadChildren: () => import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'menu/server',
        component: AppServerComponent,
      },
      { path: 'ui-components/lists', component: AppListsComponent },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
