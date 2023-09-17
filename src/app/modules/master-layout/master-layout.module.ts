import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLayoutComponent } from './screens/master-layout/master-layout.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardsModule } from '../dashboards/dashboards.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MasterLayoutRoutingModule } from './master-layout-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { PackagesModule } from '../packages/packages.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavigationService } from './services/navigation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RolesModule } from '../roles/roles.module';
import { DepartmentsModule } from '../departments/departments.module';
import { UsersModule } from '../users/users.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RefrigeratorsModule } from '../refrigerators/refrigerators.module';
import { ProductsModule } from '../products/products.module';
import { SupplyChainsModule } from '../supply-chains/supply-chains.module';
import { SupplyChainsService } from '../supply-chains/remote-services/supply-chains.service';
import { OperationLogsModule } from '../operation-logs/operation-logs.module';
import { PropertiesModule } from '../properties/properties.module';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { InventoriesModule } from '../inventories/inventories.module';
import { UnauthorizedComponent } from '../shared-components/components/unauthorized/unauthorized.component';



@NgModule({
  declarations: [
    MasterLayoutComponent,
    NavBarComponent,
    SideNavComponent,
    SidenavComponent,
    SublevelMenuComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsModule,
    MasterLayoutRoutingModule,
    WarehousesModule,
    PackagesModule,
    TranslateModule,
    RolesModule,
    DepartmentsModule,
    RefrigeratorsModule,
    UsersModule,
    BrowserAnimationsModule,
    ProductsModule,
    SupplyChainsModule,
    OperationLogsModule,
    PropertiesModule,
    InventoriesModule
  ], providers: [
    NavigationService,
    SupplyChainsService,
    TranslateService
  ]
})
export class MasterLayoutModule { }
