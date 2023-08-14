import { Permission } from "./permission";

export class Role {

    id: string;
    name: string;
    permissions: string[];



    constructor() {
        this.id = '';
        this.name = '';
        this.permissions = [];
    }
 
}