import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLayoutComponent } from './screens/master-layout/master-layout.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardsModule } from '../dashboards/dashboards.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MasterLayoutRoutingModule } from './master-layout-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { PackagesModule } from '../packages/packages.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavigationService } from './services/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { RolesModule } from '../roles/roles.module';
import { DepartmentsModule } from '../departments/departments.module';
import { RefrigeratorsManagementModule } from '../refrigerators-management/refrigerators-management.module';



@NgModule({
  declarations: [
    MasterLayoutComponent,
    NavBarComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsModule,
    MasterLayoutRoutingModule,
    WarehousesModule,
    PackagesModule,
    TranslateModule,
    RolesModule,
    DepartmentsModule,
    RefrigeratorsManagementModule
  ], providers: [
    NavigationService
  ]
})
export class MasterLayoutModule { }
