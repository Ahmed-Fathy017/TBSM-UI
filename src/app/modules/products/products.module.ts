import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsManagementComponent } from './screens/products-management/products-management.component';
import { CreateProductComponent } from './screens/create-product/create-product.component';
import { WithdrawProductComponent } from './screens/withdraw-product/withdraw-product.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from './remote-services/products.service';
import { SupplyChainsModule } from '../supply-chains/supply-chains.module';
import { LocalService } from '../shared-components/services/local.service';


@NgModule({
  declarations: [
    ProductsManagementComponent,
    CreateProductComponent,
    WithdrawProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  providers: [
    LocalService,
    ProductsService
  ]
})
export class ProductsModule { }
