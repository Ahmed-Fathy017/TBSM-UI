import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesManagementComponent } from './screens/packages-management/packages-management.component';
import { ScreensConfigProvider } from '../master-layout/providers/screens-config-provider';

const routes: Routes = [
  {path: '', component: PackagesManagementComponent, data: { config: ScreensConfigProvider.PackagesManagementScreen }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
