import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private warehouseMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getWarehouseMode(){
    return this.warehouseMode$.asObservable();
  }

  setWarehouseMode(showHide: boolean) {
    this.warehouseMode$.next(showHide);
  }

  toggleWarehouseMode() {
    this.warehouseMode$.next(!this.warehouseMode$.value);
  }

  // isNavOpen() {
  //   return this.showWarehouseMode$.value;
  // }
}
