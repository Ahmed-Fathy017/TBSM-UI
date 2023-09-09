import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyRequestsManagementComponent } from './components/supply-requests-management/supply-requests-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SupplyChainsService } from './remote-services/supply-chains.service';
import { ExternalSupplyRequestsManagementComponent } from './screens/external-supply-requests-management/external-supply-requests-management.component';
import { InternalSupplyRequestsManagementComponent } from './screens/internal-supply-requests-management/internal-supply-requests-management.component';
import { MySupplyRequestsManagementComponent } from './screens/my-supply-requests-management/my-supply-requests-management.component';



@NgModule({
  declarations: [
    SupplyRequestsManagementComponent,
    ExternalSupplyRequestsManagementComponent,
    InternalSupplyRequestsManagementComponent,
    MySupplyRequestsManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    TranslateModule
  ]
})
export class SupplyChainsModule { }
