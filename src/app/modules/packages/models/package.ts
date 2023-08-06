export class Package {
    id: number;
    name: string;
    refrigerator_numbers: number;
    products_numbers: number;
    categories_numbers: number;
    heat_alert: number;
    external_supply: number;
    created_at: string;

    // ar: { name: string };
    // en: { name: string };

    constructor() {
        this.id = 0;
        this.name = '';
        this.refrigerator_numbers = 0;
        this.products_numbers = 0;
        this.categories_numbers = 0;
        this.heat_alert = 0;
        this.external_supply = 0;
        this.created_at = '';

        // this.ar = { name: '' };
        // this.en = { name: '' };
    }
}

