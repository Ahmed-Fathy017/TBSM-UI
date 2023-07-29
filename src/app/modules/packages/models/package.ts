export class Package {
    id: number;
    name: string;
    refrigerator_numbers: number;
    products_numbers: number;
    categories_numbers: number;
    heat_alert: boolean;
    external_supply: boolean;
    created_at: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.refrigerator_numbers = 0;
        this.products_numbers = 0;
        this.categories_numbers = 0;
        this.heat_alert = false;
        this.external_supply = false;
        this.created_at = '';
    }
}

