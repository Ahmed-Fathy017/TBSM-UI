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



@NgModule({
  declarations: [
    MasterLayoutComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsModule,
    MasterLayoutRoutingModule,
    WarehousesModule
  ]
})
export class MasterLayoutModule { }
