import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


// ui components
import { AppChipsComponent } from './chips/chips.component';

import { AppListsComponent } from './lists/lists.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuRoutes } from './ui-components.routing';
import { AppMenuEComponent } from './menuList/menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { AppChild1Component } from './child1/child1.component';
import { AppChild2Component } from './child2/child2.component';
import { AppfatherComponent } from './father/father.component';
import {  AppServerComponent } from './Server/server.component';
import { NotifierContainerComponent } from 'angular-notifier';
import { NotificationModule } from 'src/app/notification.module';

@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forChild(MenuRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    MatTreeModule,
    NotificationModule

  ],
  declarations: [
    AppMenuEComponent,
    AppChipsComponent,
    AppServerComponent,
    AppListsComponent,
    AppServerComponent,
    AppTooltipsComponent,
    AppChild1Component,
    AppChild2Component,
    AppfatherComponent,


  ],
})
export class MenuModule {}
