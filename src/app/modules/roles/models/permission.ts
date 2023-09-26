export class Permission {
    id: string;
    // name: string;
    name_ar: string;
    name_en: string;
    value: string;

    // ui property
    checked: boolean;


    constructor() {
        this.id = '';
        // this.name = '';
        this.name_ar = '';
        this.name_en = '';
        this.value = '';
        this.checked = true;
    }
}