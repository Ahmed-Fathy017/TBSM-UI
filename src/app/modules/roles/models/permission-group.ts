import { Permission } from "./permission";

export class PermissionGroup {
    group_name: string = '';

    // ui property
    checked: boolean = false;
    permissions: Permission[] = [];
}