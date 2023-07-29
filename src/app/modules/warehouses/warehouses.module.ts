import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousesManagementComponent } from './screens/warehouses-management/warehouses-management.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { WarehouseDetailsComponent } from './screens/warehouse-details/warehouse-details.component';
import { WarehousesService } from './remote-services/warehouses.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WarehousesManagementComponent,
    WarehouseDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ], providers: [
    WarehousesService
  ]
})
export class WarehousesModule { }
