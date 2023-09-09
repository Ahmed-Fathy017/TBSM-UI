import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalSupplyRequestsManagementComponent } from './screens/external-supply-requests-management/external-supply-requests-management.component';
import { InternalSupplyRequestsManagementComponent } from './screens/internal-supply-requests-management/internal-supply-requests-management.component';
import { MySupplyRequestsManagementComponent } from './screens/my-supply-requests-management/my-supply-requests-management.component';

const routes: Routes = [
  { path: 'external-requests', component: ExternalSupplyRequestsManagementComponent },
  { path: 'internal-requests', component: InternalSupplyRequestsManagementComponent },
  { path: 'my-requests', component: MySupplyRequestsManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyChainsRoutingModule { }
