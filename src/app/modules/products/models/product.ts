import { Department } from "../../departments/models/department";
import { Refrigerator } from "../../refrigerators/models/refrigerator";
import { Option } from "./option";

export class Product {
    chain_demand: boolean = false;
    id: number = 0;
    name: string = '';

    number: string = '';
    options: Option[] = [];
    quantity: number = 0;

    refrigerator_id: number = 0;
    refrigerator: Refrigerator = new Refrigerator();

    category_id: number = 0;
    category: Department = new Department();
}

