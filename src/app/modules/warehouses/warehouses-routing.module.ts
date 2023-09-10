import { RouterModule, Routes } from "@angular/router";
import { WarehousesManagementComponent } from "./screens/warehouses-management/warehouses-management.component";
import { NgModule } from "@angular/core";
import { WarehouseDetailsComponent } from "./screens/warehouse-details/warehouse-details.component";
import { WarehousePropertiesManagementComponent } from "./screens/warehouse-properties-management/warehouse-properties-management.component";

const routes: Routes = [
  { path: '', component: WarehousesManagementComponent },
  { path: 'warehouse/:id', component: WarehouseDetailsComponent },
  { path: 'home', component: WarehouseDetailsComponent },
  { path: 'properties', component: WarehousePropertiesManagementComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }