import { Routes } from '@angular/router';

// ui
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppMenuEComponent } from './menuList/menu.component';
import { AppfatherComponent } from './father/father.component';
import { AppChild1Component } from './child1/child1.component';
import { AppChild2Component } from './child2/child2.component';
import { AppServerComponent } from './Server/server.component';

export const MenuRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employees',
        component: AppMenuEComponent,
      },
      
      {
        path: 'father',
        component: AppfatherComponent,

      },
      {
        path: 'child1',
        component: AppChild1Component,

      },

      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'server',
        component: AppServerComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
    ],
  },
];
