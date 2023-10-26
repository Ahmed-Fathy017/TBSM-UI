import { FormControl } from "@angular/forms";

export class Property {
    id: number = 0;
    property_id: number = 0;
    name: string = '';
    type: string = '';
    value: string = '';
    required_status: boolean = false;
    formControl: FormControl | null = null;
}