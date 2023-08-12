import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersManagementComponent } from './screens/users-management/users-management.component';



@NgModule({
  declarations: [
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
