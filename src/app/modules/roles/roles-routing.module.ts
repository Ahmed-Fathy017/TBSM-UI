import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RolesManagementComponent } from "./screens/roles-management/roles-management.component";
import { CreateRoleComponent } from "./screens/create-role/create-role.component";
import { ScreensConfigProvider } from "../master-layout/providers/screens-config-provider";
import { UpdateRoleComponent } from "./screens/update-role/update-role.component";

const routes: Routes = [
  { path: '', component: RolesManagementComponent, data: { config: ScreensConfigProvider.RolesManagementScreen } },
  { path: 'create', component: CreateRoleComponent, data: { config: ScreensConfigProvider.CreateRoleScreen } },
  { path: 'update/:id', component: UpdateRoleComponent, data: { config: ScreensConfigProvider.UpdateRoleScreen } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }