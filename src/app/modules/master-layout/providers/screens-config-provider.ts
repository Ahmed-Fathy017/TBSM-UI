export class ScreensConfigProvider {
    // public screens has no configs
    static LoginScreen: string = 'public';
    static AdminDashboardScreen: string = 'public';
    static WarehousesManagementScreen: string = 'admin';
    static PackagesManagementScreen: string = 'admin';
    static WarehouseDetailsScreen: string = 'admin';
    static UserDashboardScreen: string = 'user';
    static ProductPrintScreen: string = 'public';

    // refrigerators module screens
    static RefrigeratorsManagementScreen: string = 'Refrigerators.view';

    // roles module screens
    static RolesManagementScreen: string = 'Roles.view';
    static CreateRoleScreen: string = 'Roles.create';

    // products module screens
    static ProductsManagementScreen: string = 'Products.view';
    static CreateProductScreen: string = 'Products.create';
    static WithdrawProductScreen: string = 'Products.withdraw';
    static AddProductScreen: string = 'Products.increase_product';

    // products filter 
    static AlmostExpiredProductsViewManagementScreen: string = 'Main page.expiration_date_about_expired';
    static ExpiredProductsViewManagementScreen: string = 'Main page.expiration_date_expired';
    static EmptyQuantityProductsViewManagementScreen: string = 'Main page.products_quantity_empty';
    static LittleQuantityProductsViewManagementScreen: string = 'Main page.products_quantity_little';
    static VairableTemperatureProductsViewManagementScreen: string = 'Main page.variable_temperature';

    // supply chains module screens
    static ExternalRequestsManagementScreen: string = 'Orders.external_supply_requests';
    static InternalRequestsManagementScreen: string = 'Orders.internal_supply_requests';
    static MyRequestsManagementScreen: string = 'Orders.all_supply_requests';

    // departments module screens
    static DepartmentsManagementScreen: string = 'Categories.view';

    // properties module screens
    static PropertiesManagementScreen: string = 'Properties.view';

    // users module screens
    static UsersManagementScreen: string = 'Users.view';

    // operation logs module screens
    static OperationLogsManagementScreen: string = 'Operations log.view';

    // inventories module screens
    static InventoryScreen: string = 'Inventory.view';

    
}