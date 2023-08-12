import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsManagementComponent } from './screens/departments-management/departments-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



@NgModule({
  declarations: [
    DepartmentsManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedComponentsModule
  ]
})
export class DepartmentsModule { }
