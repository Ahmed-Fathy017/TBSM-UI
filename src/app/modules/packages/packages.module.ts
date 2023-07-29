import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesManagementComponent } from './screens/packages-management/packages-management.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { PackagesService } from './remote-services/packages.service';


@NgModule({
  declarations: [
    PackagesManagementComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    SharedComponentsModule
  ], providers: [
    PackagesService
  ]
})
export class PackagesModule { }
