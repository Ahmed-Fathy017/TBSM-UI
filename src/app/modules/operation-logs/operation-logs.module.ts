import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationLogsComponent } from './screens/operation-logs/operation-logs.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



@NgModule({
  declarations: [
    OperationLogsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class OperationLogsModule { }
