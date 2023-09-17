import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalSupplyRequestsManagementComponent } from './screens/external-supply-requests-management/external-supply-requests-management.component';
import { InternalSupplyRequestsManagementComponent } from './screens/internal-supply-requests-management/internal-supply-requests-management.component';
import { MySupplyRequestsManagementComponent } from './screens/my-supply-requests-management/my-supply-requests-management.component';
import { ScreensConfigProvider } from '../master-layout/providers/screens-config-provider';

const routes: Routes = [
  { path: 'external-requests', component: ExternalSupplyRequestsManagementComponent, data: { config: ScreensConfigProvider.ExternalRequestsManagementScreen } },
  { path: 'internal-requests', component: InternalSupplyRequestsManagementComponent, data: { config: ScreensConfigProvider.InternalRequestsManagementScreen } },
  { path: 'my-requests', component: MySupplyRequestsManagementComponent, data: { config: ScreensConfigProvider.MyRequestsManagementScreen } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyChainsRoutingModule { }
