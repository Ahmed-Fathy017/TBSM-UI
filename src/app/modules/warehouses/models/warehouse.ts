import { Package } from "../../packages/models/package";

export class Warehouse {
    id!: number;
    username!: string;
    warehouse_name!: string;
    type!: string;
    created_at!: string;
    package!: Package;
}