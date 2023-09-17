import { LocalService } from "../../shared-components/services/local.service";
import { INavbarData } from "./helper";

export class SideNavSingleton {
    private static instance: SideNavSingleton;

    static adminNavbarData: INavbarData[] = [
        {
            routeLink: 'dashboard',
            icon: 'fa-solid fa-chart-line',
            label: 'SideNav.Home',
            screenConfig: undefined,
            showInMenu: true
        },
        {
            routeLink: 'warehouses',
            icon: 'fa-solid fa-warehouse',
            label: 'SideNav.Warehouses',
            screenConfig: undefined,
            showInMenu: true
        },
        {
            routeLink: 'packages',
            icon: 'fa-solid fa-circle-dollar-to-slot',
            label: 'SideNav.Packages',
            screenConfig: undefined,
            showInMenu: true
        }
    ];


    static userNavbarData: INavbarData[] = [
        {
            routeLink: 'warehouses/home',
            icon: 'fa-solid fa-chart-line',
            label: 'SideNav.Home',
            screenConfig: undefined,
            showInMenu: true
        },
        {
            routeLink: 'management',
            icon: 'fa-solid fa-gear',
            label: 'SideNav.Management',
            screenConfig: undefined,
            showInMenu: true,
            items: [
                {
                    routeLink: 'management/refrigerators',
                    icon: 'fa-solid fa-snowflake',
                    label: 'SideNav.Refrigerators',
                    screenConfig: undefined,
                    showInMenu: true
                },
                {
                    routeLink: 'management/departments',
                    icon: 'fa-solid fa-border-all',
                    label: 'SideNav.Departments',
                    screenConfig: 'Categories.view',
                    showInMenu: true
                },
                {
                    routeLink: 'management/properties',
                    icon: 'fa-solid fa-gears',
                    label: 'SideNav.Properties',
                    screenConfig: 'Properties.view',
                    showInMenu: true
                }
            ]
        },
        {
            routeLink: 'roles',
            icon: 'fa-solid fa-user-gear',
            label: 'SideNav.Roles',
            screenConfig: undefined,
            showInMenu: true,
            items: [
                {
                    routeLink: 'roles',
                    icon: 'fa-solid fa-user-group',
                    label: 'SideNav.AllRoles',
                    screenConfig: 'Roles.view',
                    showInMenu: true
                },
                {
                    routeLink: 'roles/create',
                    icon: 'fa-solid fa-plus',
                    label: 'SideNav.CreateRole',
                    screenConfig: 'Roles.create',
                    showInMenu: true
                }
            ]
        },
        {
            routeLink: 'users',
            icon: 'fa-solid fa-users',
            label: 'SideNav.Users',
            screenConfig: 'Users.view',
            showInMenu: true
        },
        {
            routeLink: 'products',
            icon: 'fa-solid fa-box',
            label: 'SideNav.Products',
            screenConfig: undefined,
            showInMenu: true,
            items: [
                {
                    routeLink: 'products',
                    icon: 'fa-solid fa-boxes-stacked',
                    label: 'SideNav.AllProducts',
                    screenConfig: 'Products.view',
                    showInMenu: true
                },
                {
                    routeLink: 'products/create',
                    icon: 'fa-solid fa-plus',
                    label: 'SideNav.CreateProduct',
                    screenConfig: 'Products.create',
                    showInMenu: true
                },
                {
                    routeLink: 'products/withdraw',
                    icon: 'fa-solid fa-minus',
                    label: 'SideNav.WithdrawProduct',
                    screenConfig: 'Products.withdraw',
                    showInMenu: true
                }
            ]
        },
        {
            routeLink: 'supply-chains',
            icon: 'fa-solid fa-parachute-box',
            label: 'SideNav.SupplyChains',
            screenConfig: undefined,
            showInMenu: true,
            items: [
                {
                    routeLink: 'supply-chains/internal-requests',
                    icon: 'fa-solid fa-person-walking-arrow-right',
                    label: 'SideNav.InternalSupplyRequests',
                    screenConfig: 'Orders.internal_supply_requests',
                    showInMenu: true
                },
                {
                    routeLink: 'supply-chains/external-requests',
                    icon: 'fa-solid fa-truck-fast',
                    label: 'SideNav.ExternalSupplyRequests',
                    screenConfig: 'Orders.external_supply_requests',
                    showInMenu: true
                },
                {
                    routeLink: 'supply-chains/my-requests',
                    icon: 'fa-solid fa-folder',
                    label: 'SideNav.MySupplyRequests',
                    screenConfig: undefined,
                    showInMenu: true
                }
            ]
        },
        {
            routeLink: 'operation-logs',
            icon: 'fa-solid fa-folder-open',
            label: 'SideNav.OperationLogs',
            screenConfig: 'Operations_log.view',
            showInMenu: true
        },
        {
            routeLink: 'inventories',
            icon: 'fa-solid fa-warehouse',
            label: 'SideNav.Inventory',
            screenConfig: 'Inventory.view',
            showInMenu: true
        }
    ];

    static permissions = JSON.parse(LocalService.getData("permissions")!);


    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): SideNavSingleton {
        if (!SideNavSingleton.instance) {
            SideNavSingleton.instance = new SideNavSingleton();
        }

        SideNavSingleton.setupAdminNavbarData();
        SideNavSingleton.setupUserNavbarData();

        return SideNavSingleton.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    private static setupUserNavbarData() {

        this.userNavbarData.map((i: INavbarData) => {
            // looping through items
            if (i.items && i.items.length > 0) {
                i.items.map((j: INavbarData) => {
                    if (j.screenConfig)
                        j.showInMenu = this.permissions.find((p: string) => p == j.screenConfig) ? true : false;
                    else
                        j.showInMenu = true;
                });

                // reevaluating the parent module showInMenu state based on the items
                // showInMenu state, if any of the items must be shown in menu the whole module must be shown also
                i.showInMenu = i.items.some(i => i.showInMenu);
            }
            else {
                // if the screenConfig is undefined it means that the show in menu is by default true
                // but if not it means, we need to check if the config of the screen found
                // in the user permissions or not, in order to evaluate the state of the showInMenuFlag
                if (i.screenConfig)
                    i.showInMenu = this.permissions.find((p: string) => p == i.screenConfig) ? true : false;
                else
                    i.showInMenu = true;

            }
        })
    }

    private static setupAdminNavbarData() {
        // no need for implementation as all the menu items will be shown to
        // the user by default (as two separated arrays, can be enhanced and merged into one array later)
    }

    public static getAdminNavbatData() {
        return this.adminNavbarData;
    }

    public static getUserNavbatData() {
        return this.userNavbarData;
    }
}