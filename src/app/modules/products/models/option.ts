import { Property } from "../../properties/models/property";

export class Option {
    id: number = 0;
    // property_id used in creation
    property_id: number = 0;
    value: string = '';
    property: Property = new Property();
}