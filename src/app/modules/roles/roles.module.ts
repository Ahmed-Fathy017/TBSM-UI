import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesManagementComponent } from './screens/roles-management/roles-management.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRoleComponent } from './screens/create-role/create-role.component';



@NgModule({
  declarations: [
    RolesManagementComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
