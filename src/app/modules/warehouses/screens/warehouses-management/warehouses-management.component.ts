import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Warehouse } from '../../models/warehouse';
import { WarehousesService } from '../../remote-services/warehouses.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';
import { Package } from 'src/app/modules/packages/models/package';
import { ViewChild } from '@angular/core';
import { PropertyTypes } from 'src/app/modules/products/models/property-types';
import { Property } from 'src/app/modules/products/models/property';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-warehouses-management',
  templateUrl: './warehouses-management.component.html',
  styleUrls: ['./warehouses-management.component.css']
})
export class WarehousesManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'WarehousesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'WarehousesManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'WarehousesManagementScreen.SecondaryPageTitle';
  // tertiaryPageTitle: string = 'WarehousesManagementScreen.TertiaryPageTitle';

  warehouses: Warehouse[] = [];
  packages: Package[] = [];

  createWarehouseForm = new FormGroup({
    warehouseName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    package: new FormControl('', [Validators.required]),
  });

  // propetyTypes = PropertyTypes;

  // createPropertiesForm = new FormGroup({
  //   type: new FormControl('', [Validators.required]),
  //   name: new FormControl('', [Validators.required]),
  // });

  // updatePropertiesForm = new FormGroup({
  //   type: new FormControl('', [Validators.required]),
  //   name: new FormControl('', [Validators.required]),
  // });

  // properties: Property[] | null = null

  updateWarehouseForm = new FormGroup({
    warehouseName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    package: new FormControl('', [Validators.required]),
  });

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  selectedWarehouse: Warehouse = new Warehouse();

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  constructor(
    private toastr: ToastrService,
    private warehousesService: WarehousesService,
    private packagesService: PackagesService,
    private router: Router,
    private translateService: TranslateService,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
      super(translateService);
      this.screenTitleNavigationService.setScreenKey('WarehousesManagement')
    }


  // events
  ngOnInit(): void {
    this.loadPackages();
    this.loadWarehouses();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onViewButtonClick(id: number) {
    this.selectedWarehouse = this.warehouses.find(i => i.id == id)!;
    this.localService.saveData('warehouseId', String(id));
    this.router.navigate([`warehouses/warehouse/${id}`, {warehouseName: this.selectedWarehouse.warehouse_name}])
  }

  onUpdateButtonClick(id: number) {
    this.selectedWarehouse = this.warehouses.find(i => i.id == id)!;

    this.fetchSelectedWarehouseDataIntoModal();
  }

  onUpdateConfirmationClick() {
    // the password is not required to be entered, 
    // so if entered validation is set to min length of 4 characters
    if (this.updateWarehouseForm.controls.password.value)
      this.updateWarehouseForm.controls.password.setValidators([Validators.minLength(4)]);
    else
      this.updateWarehouseForm.controls.password.clearValidators();


    if (this.updateWarehouseForm.valid && this.selectedWarehouse.properties && this.selectedWarehouse.properties.length > 0) {
      this.isLoading = true;

      let requestDTO = new Warehouse();

      requestDTO.id = this.selectedWarehouse!.id;
      requestDTO.warehouse_name = this.updateWarehouseForm.controls.warehouseName.value!;
      requestDTO.username = this.updateWarehouseForm.controls.username.value!;
      requestDTO.password = this.updateWarehouseForm.controls.password.value!;
      requestDTO.package_id = parseInt(this.updateWarehouseForm.controls.package.value!);

      requestDTO.properties = this.selectedWarehouse.properties;


      this.updateWarehouse(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onDeleteButtonClick(id: number) {
    this.selectedWarehouse = this.warehouses.find(i => i.id == id)!;
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
      warehouse.package_id = parseInt(this.createWarehouseForm.controls.package.value!);

      this.isProcessing = true;
      this.isLoading = true;

      this.createWarehouse(warehouse);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  // functions
  loadWarehouses() {
    this.isLoading = true;
    let subscription = this.warehousesService.getWarehouses().subscribe(
      (response: any) => {
        this.warehouses = response.data;
        this.isLoading = false;
        this.isProcessing = false;
      }, (error: any) => {
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
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
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }


  createWarehouse(warehouse: Warehouse) {
    let subscribtion = this.warehousesService.createWarehouse(warehouse).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        this.warehouses = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  fetchSelectedWarehouseDataIntoModal() {
    if (this.selectedWarehouse) {
      this.selectedWarehouse.package_id = this.selectedWarehouse.package.id;
      this.updateWarehouseForm.controls.warehouseName.setValue(this.selectedWarehouse.warehouse_name);
      this.updateWarehouseForm.controls.username.setValue(this.selectedWarehouse.username);
      this.updateWarehouseForm.controls.password.setValue(this.selectedWarehouse.password);
      this.updateWarehouseForm.controls.package.setValue(String(this.selectedWarehouse.package.id));
    }
  }

  updateWarehouse(requestDTO: Warehouse) {

    let subscription = this.warehousesService.updateWarehouse(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let updatedWarehouse = this.warehouses.find(i => i.id == requestDTO.id);
        Object.assign(updatedWarehouse!, response.data);

        this.isLoading = false;
      }, (error: any) => {

        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }


  deleteWarehouse() {
    let subscription = this.warehousesService.deleteWarehouse(this.selectedWarehouse!.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.warehouses = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

}
