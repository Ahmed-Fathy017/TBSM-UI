import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementComponent } from './screens/products-management/products-management.component';
import { CreateProductComponent } from './screens/create-product/create-product.component';
import { WithdrawProductComponent } from './screens/withdraw-product/withdraw-product.component';

const routes: Routes = [
  { path: '', component: ProductsManagementComponent },
  { path: 'create', component: CreateProductComponent,  pathMatch: 'full'},
  { path: 'withdraw', component: WithdrawProductComponent,  pathMatch: 'full' },
  { path: ':filter', component: ProductsManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
