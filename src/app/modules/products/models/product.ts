import { Department } from "../../departments/models/department";
import { Refrigerator } from "../../refrigerators/models/refrigerator";
import { Option } from "./option";
import { Property } from "./property";

export class Product {
    chain_demand: number = 0;
    id: number = 0;
    name: string = '';

    number: string = '';
    options: Option[] = [];
    quantity: number = 0;

    refrigerator_id: number = 0;
    refrigerator: Refrigerator = new Refrigerator();

    category_id: number = 0;
    category: Department = new Department();

    properties: Property[] | null = [];

    UIId: number = 0;
}

