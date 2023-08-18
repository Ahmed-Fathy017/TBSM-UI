import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RefrigeratorsManagementComponent } from './screens/refrigerators-management/refrigerators-management.component';



@NgModule({
  declarations: [
    RefrigeratorsManagementComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class RefrigeratorsModule { }
