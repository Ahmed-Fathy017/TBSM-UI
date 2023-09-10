import { Package } from "../../packages/models/package";
import { Property } from "../../properties/models/property";

export class Warehouse {
    id!: number;
    username!: string;
    password!:string;
    warehouse_name!: string;
    type!: string;
    created_at!: string;
    package!: Package;
    package_id!: number;

    properties: Property[] | null = null;
}