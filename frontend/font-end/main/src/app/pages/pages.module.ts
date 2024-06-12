import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppDashboardadminComponent } from './dashboard-admin/dashboard-admin.component';
import { MatTreeModule } from '@angular/material/tree';
import { NotificationModule } from '../notification.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppServerComponent } from './ui-components/Server/server.component';
import { AppDashboardmoderatorComponent } from './dashboard-moderator/dashboard-moderator.component';

@NgModule({
  declarations: [AppDashboardComponent,AppDashboardadminComponent,AppDashboardmoderatorComponent],
  imports: [
    CommonModule,
    MaterialModule,

    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    MatButtonModule,
    MatCardModule,
    MatTreeModule,
    NotificationModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
