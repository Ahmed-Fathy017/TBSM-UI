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
import { PropertiesManagementComponent } from '../properties/screens/properties-management/properties-management.component';
import { InventoryComponent } from '../inventories/screens/inventory/inventory.component';
import { ScreensConfigProvider } from './providers/screens-config-provider';

const routes: Routes = [
  {
    path: '', component: MasterLayoutComponent, canActivateChild: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MainDashboardComponent, data: { config: ScreensConfigProvider.AdminDashboardScreen } },

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
      {
        path: 'supply-chains',
        loadChildren: () => import('../supply-chains/supply-chains-routing.module').then(m => m.SupplyChainsRoutingModule)
      },
      { path: 'management/departments', component: DepartmentsManagementComponent, data: { config: ScreensConfigProvider.DepartmentsManagementScreen } },
      { path: 'management/refrigerators', component:  RefrigeratorsManagementComponent, data: { config: ScreensConfigProvider.RefrigeratorsManagementScreen }},
      { path: 'management/properties', component: PropertiesManagementComponent, data: { config: ScreensConfigProvider.PropertiesManagementScreen } },
      { path: 'users', component: UsersManagementComponent, data: { config: ScreensConfigProvider.UsersManagementScreen } },
      { path: 'operation-logs', component: OperationLogsComponent, data: { config: ScreensConfigProvider.OperationLogsManagementScreen } },
      { path: 'inventories', component: InventoryComponent, data: { config: ScreensConfigProvider.InventoryScreen } },
    ]
  },


  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLayoutRoutingModule { }
