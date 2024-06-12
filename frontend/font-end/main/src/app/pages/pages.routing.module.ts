import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppDashboardadminComponent } from './dashboard-admin/dashboard-admin.component';
import { AppDashboardmoderatorComponent } from './dashboard-moderator/dashboard-moderator.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Dashboard',
    },
  },
  { path: '/admin', component: AppDashboardadminComponent },
  { path: '/mod', component: AppDashboardmoderatorComponent },
 // { path: '/user', component: AppDashboarduserComponent },



];
