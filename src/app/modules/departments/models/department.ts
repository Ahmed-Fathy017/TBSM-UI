import { Product } from "../../products/models/product";

export class Department {
    id: number = 0;
    name: string = "";
    permission_name: string = "";

    products: Product[] = [];

    category: string = '';

    // UI properties
    pagesCount:number =  0;
    pages: number[] = [];
    selectedPage: number = 1;
    minPage: number = 1;

    paginatedProducts:Product[] = [];
}