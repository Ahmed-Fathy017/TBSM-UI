import { Role } from "../../roles/models/role";

export class User {
    id: number = 0;
    fullname: string = "";
    username: string = "";
    password: string = "";
    status: boolean = false;
    created_at: string = "";
    role: Role = new Role();
    role_id: number = 0;
}