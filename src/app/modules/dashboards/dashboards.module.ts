import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './screens/main-dashboard/main-dashboard.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ]
})
export class DashboardsModule { }
