import { Component, OnDestroy, OnInit } from '@angular/core';
import { Warehouse } from '../../models/warehouse';
import { WarehousesService } from '../../remote-services/warehouses.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-warehouses-management',
  templateUrl: './warehouses-management.component.html',
  styleUrls: ['./warehouses-management.component.css']
})
export class WarehousesManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'الرئيسية / المستودعات /';
  coloredPageTitle: string = 'انشاء مستودع'
  secondPageTitle: string = 'جميع المستودعات';

  warehouses: Warehouse[] = [];

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  constructor(
    private toastr: ToastrService,
    private warehousesService: WarehousesService) { }

  ngOnInit(): void {
    this.loadWarehouses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadWarehouses() {
    this.isLoading = true;
    let subscription = this.warehousesService.getWarehouses().subscribe(
      (response: any) => {
        this.warehouses = response.data;
        this.isLoading = false;

      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;

      }
    );

    this.subscription.add(subscription);
  }

}
