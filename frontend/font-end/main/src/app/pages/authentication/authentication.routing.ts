import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent
  }
];
