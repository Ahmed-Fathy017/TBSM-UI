import { Permission } from "./permission";

export class Role {

    id: string;
    name: string;
    // role is another response from backend, equivelent to name property
    role: string;
    permissions: string[];

    constructor() {
        this.id = '';
        this.name = '';
        this.role = '';
        this.permissions = [];
    }
 
}