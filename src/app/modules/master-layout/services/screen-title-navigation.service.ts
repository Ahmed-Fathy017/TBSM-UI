import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IScreenNavigator } from '../models/screen-navigator';

@Injectable({
  providedIn: 'root'
})
export class ScreenTitleNavigationService {

  private screenKey$ = new BehaviorSubject<string>('');

  private screensMap = new Map<string, IScreenNavigator[]>([
    ["UserDashboard", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }]],
    ["RefrigeratorsManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.RefrigeratorsManagement', routeLink: 'management/refrigerators' }]],
    ["DepartmentsManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.DepartmentsManagement', routeLink: 'management/departments' }]],
    ["PropertiesManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.PropertiesManagement', routeLink: 'management/properties' }]],
    ["RolesManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.RolesManagement', routeLink: 'roles' }]],
    ["CreateRole", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.CreateRole', routeLink: 'roles/create' }]],
    ["UsersManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.UsersManagement', routeLink: 'users' }]],
    ["ProductsManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.ProductsManagement', routeLink: 'products' }]],
    ["CreateProduct", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.CreateProduct', routeLink: 'products/create' }]],
    ["WithdrawProduct", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.WithdrawProduct', routeLink: 'products/withdraw' }]],
    ["AddProduct", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.AddProduct', routeLink: 'products/add' }]],
    ["ExternalSupplyRequests", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.ExternalSupplyRequests', routeLink: 'supply-chains/external-requests' }]],
    ["InternalSupplyRequests", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.InternalSupplyRequests', routeLink: 'supply-chains/internal-requests' }]],
    ["MySupplyRequests", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.MySupplyRequests', routeLink: 'supply-chains/my-requests' }]],
    ["OperationLogs", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.OperationLogs', routeLink: 'operation-logs' }]],
    ["Inventory", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.Inventory', routeLink: 'inventories' }]],
    ["AdminDashboard", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }]],
    ["WarehousesManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.WarehousesManagement', routeLink: 'warehouses' }]],
    // ["SelectedWarehouse", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.WarehousesManagement', routeLink: 'warehouses' }]],
    ["PackagesManagement", [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.PackagesManagement', routeLink: 'packages' }]],


  ]);

  getScreenKey(): Observable<string> {
    return this.screenKey$.asObservable();
  }

  setScreenKey(newState: string) {
    this.screenKey$.next(newState);
  }

  getTitleNavigationDetails(screenKey: string, additionalData: any = null): IScreenNavigator[] {
    if (additionalData || screenKey === 'SelectedWarehouse')
      this.screensMap.set('SelectedWarehouse', [{ name: 'ScreenNames.Home', routeLink: 'dashboard' }, { name: 'ScreenNames.WarehousesManagement', routeLink: 'warehouses' }, { name: `${additionalData?.name}`, routeLink: `warehouses/warehouse/${additionalData?.id}` }]);

    return this.screensMap.get(screenKey)!;
  }

  constructor() { }
}
