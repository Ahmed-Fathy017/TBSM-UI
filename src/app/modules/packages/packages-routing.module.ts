import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesManagementComponent } from './screens/packages-management/packages-management.component';

const routes: Routes = [
  {path: '', component: PackagesManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
