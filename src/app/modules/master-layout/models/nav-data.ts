import { INavbarData } from "./helper";

export const adminNavbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa-solid fa-chart-line',
        label: 'SideNav.Home'
    },
    {
        routeLink: 'warehouses',
        icon: 'fa-solid fa-warehouse',
        label: 'SideNav.Warehouses'
    },
    {
        routeLink: 'packages',
        icon: 'fa-solid fa-circle-dollar-to-slot',
        label: 'SideNav.Packages'
    }
];


export const userNavbarData: INavbarData[] = [
    {
        routeLink: 'warehouses/home',
        icon: 'fa-solid fa-chart-line',
        label: 'SideNav.Home'

    },
    {
        routeLink: 'management',
        icon: 'fa-solid fa-gear',
        label: 'SideNav.Management',
        items: [
            {
                routeLink: 'management/refrigerators',
                icon: 'fa-solid fa-snowflake',
                label: 'SideNav.Refrigerators'
            },
            {
                routeLink: 'management/departments',
                icon: 'fa-solid fa-border-all',
                label: 'SideNav.Departments'
            },
            {
                routeLink: 'management/properties',
                icon: 'fa-solid fa-gears',
                label: 'SideNav.Properties'
            }
        ]
    },
    {
        routeLink: 'roles',
        icon: 'fa-solid fa-user-gear',
        label: 'SideNav.Roles',
        items: [
            {
                routeLink: 'roles',
                icon: 'fa-solid fa-user-group',
                label: 'SideNav.AllRoles'
            },
            {
                routeLink: 'roles/create',
                icon: 'fa-solid fa-plus',
                label: 'SideNav.CreateRole'
            }
        ]
    },
    {
        routeLink: 'users',
        icon: 'fa-solid fa-users',
        label: 'SideNav.Users'
    },
    {
        routeLink: 'products',
        icon: 'fa-solid fa-box',
        label: 'SideNav.Products',
        items: [
            {
                routeLink: 'products',
                icon: 'fa-solid fa-boxes-stacked',
                label: 'SideNav.AllProducts'
            },
            {
                routeLink: 'products/create',
                icon: 'fa-solid fa-plus',
                label: 'SideNav.CreateProduct'
            },
            {
                routeLink: 'products/withdraw',
                icon: 'fa-solid fa-minus',
                label: 'SideNav.WithdrawProduct'
            }
        ]
    },
    {
        routeLink: 'supply-chains',
        icon: 'fa-solid fa-parachute-box',
        label: 'SideNav.SupplyChains',
        items: [
            {
                routeLink: 'supply-chains/internal-requests',
                icon: 'fa-solid fa-person-walking-arrow-right',
                label: 'SideNav.InternalSupplyRequests'
            },
            {
                routeLink: 'supply-chains/external-requests',
                icon: 'fa-solid fa-truck-fast',
                label: 'SideNav.ExternalSupplyRequests'
            },
            {
                routeLink: 'supply-chains/my-requests',
                icon: 'fa-solid fa-folder',
                label: 'SideNav.MySupplyRequests'
            }
        ]
    },
    {
        routeLink: 'operation-logs',
        icon: 'fa-solid fa-folder-open',
        label: 'SideNav.OperationLogs'
    },
    // {
    //     routeLink: 'departments',
    //     icon: 'fa-solid fa-border-all',
    //     label: 'SideNav.Departments'
    // },
    // {
    //     routeLink: 'refrigerators',
    //     icon: 'fa-solid fa-snowflake',
    //     label: 'SideNav.Refrigerators'
    // },
   
];