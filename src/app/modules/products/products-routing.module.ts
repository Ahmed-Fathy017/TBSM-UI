import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementComponent } from './screens/products-management/products-management.component';
import { CreateProductComponent } from './screens/create-product/create-product.component';
import { WithdrawProductComponent } from './screens/withdraw-product/withdraw-product.component';
import { ScreensConfigProvider } from '../master-layout/providers/screens-config-provider';

const routes: Routes = [
  { path: '', component: ProductsManagementComponent, data: { config: ScreensConfigProvider.ProductsManagementScreen } },
  { path: 'create', component: CreateProductComponent, data: { config: ScreensConfigProvider.CreateProductScreen } },
  { path: 'withdraw', component: WithdrawProductComponent, data: { config: ScreensConfigProvider.WithdrawProductScreen } },
  { path: 'empty-quantity', component: ProductsManagementComponent, data: { config: ScreensConfigProvider.EmptyQuantityProductsViewManagementScreen } },
  { path: 'little-quantity', component: ProductsManagementComponent, data: { config: ScreensConfigProvider.LittleQuantityProductsViewManagementScreen } },
  { path: 'variable-temperature', component: ProductsManagementComponent, data: { config: ScreensConfigProvider.VairableTemperatureProductsViewManagementScreen } },
  { path: 'expired-date', component: ProductsManagementComponent, data: { config: ScreensConfigProvider.ExpiredProductsViewManagementScreen } },
  { path: 'almost-expired-date', component: ProductsManagementComponent, data: { config: ScreensConfigProvider.AlmostExpiredProductsViewManagementScreen } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
