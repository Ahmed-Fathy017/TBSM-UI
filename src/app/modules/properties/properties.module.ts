import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PropertiesManagementComponent } from './screens/properties-management/properties-management.component';



@NgModule({
  declarations: [
    PropertiesManagementComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class PropertiesModule { }
