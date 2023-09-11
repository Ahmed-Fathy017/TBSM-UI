import { Property } from "./property";

export class Option {
    id: number = 0;
    // property_id used in creation
    property_id: number = 0;
    value: string = '';
    property: Property = new Property();

    // UI properties
    // isNew: boolean = false;
}