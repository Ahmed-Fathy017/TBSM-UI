import { RouterModule, Routes } from "@angular/router";
import { WarehousesManagementComponent } from "./screens/warehouses-management/warehouses-management.component";
import { NgModule } from "@angular/core";
import { WarehouseDetailsComponent } from "./screens/warehouse-details/warehouse-details.component";
import { ScreensConfigProvider } from "../master-layout/providers/screens-config-provider";

const routes: Routes = [
  { path: '', component: WarehousesManagementComponent, data: { config: ScreensConfigProvider.WarehousesManagementScreen } },
  { path: 'warehouse/:id', component: WarehouseDetailsComponent, data: { config: ScreensConfigProvider.WarehouseDetailsScreen } },
  { path: 'home', component: WarehouseDetailsComponent, data: { config: ScreensConfigProvider.UserDashboardScreen, key: 'UserDashboard' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }