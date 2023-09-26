export class Permission {
    id: string;
    name_ar: string;
    name_en: string;
    value: string;

    // ui property
    checked: boolean;


    constructor() {
        this.id = '';
        this.name_ar = '';
        this.name_en = '';
        this.value = '';
        this.checked = true;
    }
}