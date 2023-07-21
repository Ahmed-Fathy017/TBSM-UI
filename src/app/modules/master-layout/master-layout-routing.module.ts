import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './screens/master-layout/master-layout.component';
import { AuthGuardService } from '../authentication/services/auth-guard.service';
import { MainDashboardComponent } from '../dashboards/screens/main-dashboard/main-dashboard.component';
import { WarehousesManagementComponent } from '../warehouses/screens/warehouses-management/warehouses-management.component';

const routes: Routes = [
  {
    path: '', component: MasterLayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MainDashboardComponent},
      { path: 'warehouses', component: WarehousesManagementComponent},
    ]
  },


  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLayoutRoutingModule { }
