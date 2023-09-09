import { SupplyRequest } from "./supply-request";

export class SupplyRequestsGroup {
    data: SupplyRequest[] = [];

    // UI properties
    pagesCount:number =  0;
    pages: number[] = [];
    selectedPage: number = 1;
    // takes the reference for the last selected page before deletion, 
    //so when reloading the data the navigator will stay on the same page with the right data
    lastSelectedPage: number | null = null; 
    minPage: number = 1;

    paginatedData:SupplyRequest[] = [];
}