import { ScreensConfigProvider } from "../providers/screens-config-provider";

export let adminPermissions = [
    ScreensConfigProvider.AlmostExpiredProductsViewManagementScreen,
    ScreensConfigProvider.ExpiredProductsViewManagementScreen,
    ScreensConfigProvider.EmptyQuantityProductsViewManagementScreen,
    ScreensConfigProvider.LittleQuantityProductsViewManagementScreen,
    ScreensConfigProvider.VairableTemperatureProductsViewManagementScreen,
    ScreensConfigProvider.ProductsManagementScreen
];

// export let secondaryAdminPermissions = [
//     ScreensConfigProvider.AlmostExpiredProductsViewManagementScreen,
//     ScreensConfigProvider.ExpiredProductsViewManagementScreen,
//     ScreensConfigProvider.EmptyQuantityProductsViewManagementScreen,
//     ScreensConfigProvider.LittleQuantityProductsViewManagementScreen,
//     ScreensConfigProvider.VairableTemperatureProductsViewManagementScreen,
//     ScreensConfigProvider.ProductsManagementScreen,
//     ScreensConfigProvider.RefrigeratorsManagementScreen, // creation part to be handeled to not display by if condition
//     ScreensConfigProvider.DepartmentsManagementScreen, // creation part to be handeled to not display by if condition
//     ScreensConfigProvider.PropertiesManagementScreen, // creation part to be handeled to not display by if condition
//     ScreensConfigProvider.RolesManagementScreen,
//     ScreensConfigProvider.UsersManagementScreen,  // creation part to be handeled to not display by if condition
//     ScreensConfigProvider.ExternalRequestsManagementScreen,  
//     ScreensConfigProvider.InternalRequestsManagementScreen, 
//     ScreensConfigProvider.MyRequestsManagementScreen,  
//     ScreensConfigProvider.OperationLogsManagementScreen,  
//     ScreensConfigProvider.InventoryScreen, // ask about it????
// ];