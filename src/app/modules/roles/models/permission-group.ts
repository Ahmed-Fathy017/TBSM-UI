import { Permission } from "./permission";

export class PermissionGroup {
    // group_name: string = '';
    group_name_ar: string = '';
    group_name_en: string = '';

    // ui property
    checked: boolean = false;
    permissions: Permission[] = [];
}