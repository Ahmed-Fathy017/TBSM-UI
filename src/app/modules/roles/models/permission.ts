export class Permission {
    id: string;
    name: string;

    // ui property
    checked: boolean;


    constructor() {
        this.id = '';
        this.name = '';
        this.checked = true;
    }
}