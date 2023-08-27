import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RolesManagementComponent } from "./screens/roles-management/roles-management.component";
import { CreateRoleComponent } from "./screens/create-role/create-role.component";

const routes: Routes = [
  { path: '', component: RolesManagementComponent },
  { path: 'create', component: CreateRoleComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }