import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './screens/master-layout/master-layout.component';
import { AuthGuardService } from '../authentication/services/auth-guard.service';
import { MainDashboardComponent } from '../dashboards/screens/main-dashboard/main-dashboard.component';
import { RolesManagementComponent } from '../roles/screens/roles-management/roles-management.component';
import { DepartmentsManagementComponent } from '../departments/screens/departments-management/departments-management.component';
import { UsersManagementComponent } from '../users/screens/users-management/users-management.component';
import { RefrigeratorsManagementComponent } from '../refrigerators/screens/refrigerators-management/refrigerators-management.component';
import { OperationLogsComponent } from '../operation-logs/screens/operation-logs/operation-logs.component';

const routes: Routes = [
  {
    path: '', component: MasterLayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MainDashboardComponent },

      {
        path: 'warehouses',
        loadChildren: () => import('../warehouses/warehouses-routing.module').then(m => m.WarehouseRoutingModule)
      },
      {
        path: 'packages',
        loadChildren: () => import('../packages/packages-routing.module').then(m => m.PackagesRoutingModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('../roles/roles-routing.module').then(m => m.RolesRoutingModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products-routing.module').then(m => m.ProductsRoutingModule)
      },
      { path: 'departments', component: DepartmentsManagementComponent },
      { path: 'refrigerators', component: RefrigeratorsManagementComponent },
      { path: 'users', component: UsersManagementComponent },
      { path: 'operation-logs', component: OperationLogsComponent },
    ]
  },


  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLayoutRoutingModule { }
