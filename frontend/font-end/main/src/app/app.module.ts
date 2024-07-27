/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { AuthInterceptor } from './services/AuthInterceptors';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { EditEmployeeDialogComponent } from './edit-employee-dialog-component/edit-employee-dialog-component.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    EditEmployeeDialogComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Indique qu'il peut y avoir plusieurs intercepteurs HTTP
    }
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { AuthInterceptor } from './services/AuthInterceptors';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { EditEmployeeDialogComponent } from './edit-employee-dialog-component/edit-employee-dialog-component.component';
import { HttpClient } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
// Add NGX Translate
import { TranslateService ,  TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTreeModule } from '@angular/material/tree';
import { NotificationModule } from './notification.module';
import { AppServerComponent } from './pages/ui-components/Server/server.component';
import { AddLogSourceComponent } from './add-log-source/add-log-source.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SnapshotsMaintenanceComponent } from './snapshots-maintenance/snapshots-maintenance.component';
import { ClusterStatusComponent } from './cluster-status/cluster-status.component';
import { InstanceStatusComponent } from './instance-status/instance-status.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { AppDashboardadminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { MonitoredServiceComponent } from './monitored-service/monitored-service.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HelpsComponent } from './helps/helps.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,

    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    EditEmployeeDialogComponent,
    AddLogSourceComponent,
    AdminOverviewComponent,
    UserManagementComponent,
    SnapshotsMaintenanceComponent,
    ClusterStatusComponent,
    InstanceStatusComponent,
    LineChartComponent,
    MonitoredServiceComponent,
    AddEmployeeDialogComponent,
    UserProfileComponent,
    NotificationsComponent,
    HelpsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    NgApexchartsModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTreeModule ,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    TablerIconsModule.pick(TablerIcons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Indique qu'il peut y avoir plusieurs intercepteurs HTTP
    },
    // Add TranslateService to providers
  //  TranslateService
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],

})
export class AppModule {}

// Add HttpLoaderFactory function
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
