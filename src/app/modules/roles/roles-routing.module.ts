import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RolesManagementComponent } from "./screens/roles-management/roles-management.component";
import { CreateRoleComponent } from "./screens/create-role/create-role.component";
import { ScreensConfigProvider } from "../master-layout/providers/screens-config-provider";

const routes: Routes = [
  { path: '', component: RolesManagementComponent, data: { config: ScreensConfigProvider.RolesManagementScreen } },
  { path: 'create', component: CreateRoleComponent, data: { config: ScreensConfigProvider.CreateRoleScreen } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }