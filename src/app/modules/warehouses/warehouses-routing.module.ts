import { RouterModule, Routes } from "@angular/router";
import { WarehousesManagementComponent } from "./screens/warehouses-management/warehouses-management.component";
import { NgModule } from "@angular/core";
import { WarehouseDetailsComponent } from "./screens/warehouse-details/warehouse-details.component";

const routes: Routes = [
  { path: '', component: WarehousesManagementComponent },
  { path: 'warehouse/:id', component: WarehouseDetailsComponent },
  { path: 'home', component: WarehouseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }