export class ScreensConfigProvider {
    // public screens has no configs
    static LoginScreen: string = 'public';
    static AdminDashboardScreen: string = 'public';
    static WarehousesManagementScreen: string = 'public';
    static WarehouseDetailsScreen: string = 'public';
    static PackagesManagementScreen: string = 'public';
    static MyRequestsManagementScreen: string = 'public';
    static RefrigeratorsManagementScreen: string = 'public';

    // roles module screens
    static RolesManagementScreen: string = 'Roles.view';
    static CreateRoleScreen: string = 'Roles.create';

    // products module screens
    static ProductsManagementScreen: string = 'Products.view';
    static CreateProductScreen: string = 'Properties.create';
    static WithdrawProductScreen: string = 'Products.withdraw';

    // products filter 
    static AlmostExpiredProductsViewManagementScreen: string = 'Main_page.expiration_date_about_expired';
    static ExpiredProductsViewManagementScreen: string = 'Main_page.expiration_date_expired';
    static EmptyQuantityProductsViewManagementScreen: string = 'Main_page.products_quantity_empty';
    static LittleQuantityProductsViewManagementScreen: string = 'Main_page.products_quantity_little';
    static VairableTemperatureProductsViewManagementScreen: string = 'Main_page.variable_temperature';

    // supply chains module screens
    static ExternalRequestsManagementScreen: string = 'Orders.external_supply_requests';
    static InternalRequestsManagementScreen: string = 'Orders.internal_supply_requests';

    // departments module screens
    static DepartmentsManagementScreen: string = 'Categories.view';

    // properties module screens
    static PropertiesManagementScreen: string = 'Properties.view';

    // users module screens
    static UsersManagementScreen: string = 'Users.view';

    // operation logs module screens
    static OperationLogsManagementScreen: string = 'Operations_log.view';

    // inventories module screens
    static InventoryScreen: string = 'Inventory.view';

    
}