import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefrigeratorsManagementComponent } from './screens/refrigerators-management/refrigerators-management.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';



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
export class RefrigeratorsManagementModule { }
