import { Component, OnDestroy, OnInit } from '@angular/core';
import { Warehouse } from '../../models/warehouse';
import { WarehousesService } from '../../remote-services/warehouses.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';
import { Package } from 'src/app/modules/packages/models/package';

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
  packages: Package[] = [];

  createWarehouseForm = new FormGroup({
    warehouseName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    package: new FormControl('', [Validators.required]),
  });

  upodateWarehouseForm = new FormGroup({
    warehouseName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    package: new FormControl('', [Validators.required]),
  });

  selectedWarehouse?: Warehouse;

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  constructor(
    private toastr: ToastrService,
    private warehousesService: WarehousesService,
    private packagesService: PackagesService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadPackages();
    this.loadWarehouses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onViewButtonClick(id: number) {
    this.router.navigate([`warehouses/warehouse/${id}`])
  }

  onDeleteButtonClick(id: number) {
    this.selectedWarehouse = this.warehouses.find(i => i.id == id);
    console.log(this.selectedWarehouse)
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deleteWarehouse();
  }

  onCreateButtonClick() {
    if (this.createWarehouseForm.valid) {

      let warehouse = new Warehouse();

      warehouse.warehouse_name = this.createWarehouseForm.controls.warehouseName.value!;
      warehouse.username = this.createWarehouseForm.controls.username.value!;
      warehouse.password = this.createWarehouseForm.controls.password.value!;
      warehouse.package_id = this.createWarehouseForm.controls.package.value!;

      this.isProcessing = true;
      this.isLoading = true;

      this.createWarehouse(warehouse);
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  loadWarehouses() {
    this.isLoading = true;
    let subscription = this.warehousesService.getWarehouses().subscribe(
      (response: any) => {
        console.log(response)
        this.warehouses = response.data;
        this.isLoading = false;
        this.isProcessing = false;
      }, (error: any) => {
        this.toastr.error(error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  loadPackages() {
    let subscription = this.packagesService.getPackages().subscribe(
      (response: any) => {
        this.packages = response.data;
      }, (error: any) => {
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }


  createWarehouse(warehouse: Warehouse) {
    let subscribtion = this.warehousesService.createWarehouse(warehouse).subscribe(
      (response: any) => {
        console.log(response)
        this.toastr.success(response.message);

        this.warehouses = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }


  deleteWarehouse() {
    let subscription = this.warehousesService.deleteWarehouse(this.selectedWarehouse!.id).subscribe(
      (response: any) => {
        console.log(response)
        this.toastr.success(response.message);
        this.warehouses = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);

      }
    );

    this.subscription.add(subscription);
  }

}
