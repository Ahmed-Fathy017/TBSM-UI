import { INavbarData } from "./helper";

export var adminNavbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa-solid fa-chart-line',
        iconUrl: '../../../../../assets/images/menu/home.svg',
        label: 'SideNav.Home',
        screenConfig: undefined,
        showInMenu: true
    },
    {
        routeLink: 'warehouses',
        icon: 'fa-solid fa-warehouse',
        iconUrl: '../../../../../assets/images/menu/warehouses.svg',
        label: 'SideNav.Warehouses',
        screenConfig: undefined,
        showInMenu: true
    },
    {
        routeLink: 'packages',
        icon: 'fa-solid fa-circle-dollar-to-slot',
        iconUrl: '../../../../../assets/images/menu/packages.svg',
        label: 'SideNav.Packages',
        screenConfig: undefined,
        showInMenu: true
    }
];

export var userNavbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa-solid fa-chart-line',
        iconUrl: '../../../../../assets/images/menu/home.svg',
        label: 'SideNav.Home',
        screenConfig: undefined,
        showInMenu: true
    },
    {
        routeLink: 'management',
        icon: 'fa-solid fa-gear',
        iconUrl: '../../../../../assets/images/menu/management.png',
        label: 'SideNav.Management',
        screenConfig: undefined,
        showInMenu: true,
        items: [
            {
                routeLink: 'management/refrigerators',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.Refrigerators',
                screenConfig: 'Refrigerators.view',
                showInMenu: true
            },
            {
                routeLink: 'management/departments',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.Departments',
                screenConfig: 'Categories.view',
                showInMenu: true
            },
            {
                routeLink: 'management/properties',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.Properties',
                screenConfig: 'Properties.view',
                showInMenu: true
            }
        ]
    },
    {
        routeLink: 'roles',
        icon: 'fa-solid fa-user-gear',
        iconUrl: '../../../../../assets/images/menu/roles.svg',
        label: 'SideNav.Roles',
        screenConfig: undefined,
        showInMenu: true,
        items: [
            {
                routeLink: 'roles',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.AllRoles',
                screenConfig: 'Roles.view',
                showInMenu: true
            },
            {
                routeLink: 'roles/create',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.CreateRole',
                screenConfig: 'Roles.create',
                showInMenu: true
            }
        ]
    },
    {
        routeLink: 'users',
        icon: 'fa-solid fa-users',
        iconUrl: '../../../../../assets/images/menu/users.svg',
        label: 'SideNav.Users',
        screenConfig: 'Users.view',
        showInMenu: true
    },
    {
        routeLink: 'products',
        icon: 'fa-solid fa-box',
        iconUrl: '../../../../../assets/images/menu/products.svg',
        label: 'SideNav.Products',
        screenConfig: undefined,
        showInMenu: true,
        items: [
            {
                routeLink: 'products',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.AllProducts',
                screenConfig: 'Products.view',
                showInMenu: true
            },
            {
                routeLink: 'products/create',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.CreateProduct',
                screenConfig: 'Products.create',
                showInMenu: true
            },
            {
                routeLink: 'products/withdraw',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.WithdrawProduct',
                screenConfig: 'Products.withdraw',
                showInMenu: true
            },
            {
                routeLink: 'products/add',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.AddProduct',
                screenConfig: 'Products.increase_product',
                showInMenu: true
            }
        ]
    },
    {
        routeLink: 'supply-chains',
        icon: 'fa-solid fa-parachute-box',
        iconUrl: '../../../../../assets/images/menu/products.svg',
        label: 'SideNav.SupplyChains',
        screenConfig: undefined,
        showInMenu: true,
        items: [
            {
                routeLink: 'supply-chains/internal-requests',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.InternalSupplyRequests',
                screenConfig: 'Orders.internal_supply_requests',
                showInMenu: true
            },
            {
                routeLink: 'supply-chains/external-requests',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.ExternalSupplyRequests',
                screenConfig: 'Orders.external_supply_requests',
                showInMenu: true
            },
            {
                routeLink: 'supply-chains/my-requests',
                icon: 'fa-solid fa-circle',
                label: 'SideNav.MySupplyRequests',
                screenConfig: undefined,
                showInMenu: true
            }
        ]
    },
    {
        routeLink: 'operation-logs',
        icon: 'fa-solid fa-folder-open',
        iconUrl: '../../../../../assets/images/menu/operations.svg',
        label: 'SideNav.OperationLogs',
        screenConfig: 'Operations log.view',
        showInMenu: true
    },
    {
        routeLink: 'inventories',
        icon: 'fa-solid fa-warehouse',
        iconUrl: '../../../../../assets/images/menu/warehouses.svg',
        label: 'SideNav.Inventory',
        screenConfig: 'Inventory.view',
        showInMenu: true
    }
];