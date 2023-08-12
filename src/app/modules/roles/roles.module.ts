import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesManagementComponent } from './screens/roles-management/roles-management.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RolesManagementComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
