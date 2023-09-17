import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesManagementComponent } from './screens/packages-management/packages-management.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { PackagesService } from './remote-services/packages.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PackagesManagementComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    TranslateModule
  ], providers: [
    PackagesService
  ]
})
export class PackagesModule { }
