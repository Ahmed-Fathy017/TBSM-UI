export interface INavbarData {
    routeLink: string;
    icon?: string;
    iconUrl?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[];
    screenConfig?: string;
    showInMenu: boolean;
}