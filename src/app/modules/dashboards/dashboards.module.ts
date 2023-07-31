import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './screens/main-dashboard/main-dashboard.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { DashboardsService } from './remote-services/dashboards.service';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ], providers: [
    DashboardsService
  ]
})
export class DashboardsModule { }
