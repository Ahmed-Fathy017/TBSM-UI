import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Package } from '../../models/package';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../remote-services/packages.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-packages-management',
  templateUrl: './packages-management.component.html',
  styleUrls: ['./packages-management.component.css']
})
export class PackagesManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'الرئيسية  /  الباقات /';
  coloredPageTitle: string = 'انشاء باقه'
  secondPageTitle: string = 'جميع الباقات';

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  packages: Package[] = [];

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  createPackageForm = new FormGroup({
    packageName: new FormControl('', [Validators.required]),
    refrigeratorSetting: new FormControl('', [Validators.required]),
    productSetting: new FormControl('', [Validators.required]),
    departmentSetting: new FormControl('', [Validators.required]),
    temperatureAlert: new FormControl(false),
    externalSupply: new FormControl(false),
  });

  updatePackageForm = new FormGroup({
    packageName: new FormControl('', [Validators.required]),
    refrigeratorSetting: new FormControl('', [Validators.required]),
    productSetting: new FormControl('', [Validators.required]),
    departmentSetting: new FormControl('', [Validators.required]),
    temperatureAlert: new FormControl(false),
    externalSupply: new FormControl(false),
  });

  selectedPackage?: Package;

  constructor(
    private toastr: ToastrService,
    private packagesService: PackagesService) { }


  ngOnInit(): void {
    this.loadPackages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onViewButtonClick(id: number) {
  //   this.router.navigate([`packages/warehouse/${id}`])
  // }

  onUpdateButtonClick(id: number) {
    this.selectedPackage = this.packages.find(i => i.id == id);

    this.fetchSelectedWarehouseDataIntoModal();
  }

  onUpdateConfirmationClick() {

    if (this.updatePackageForm.valid) {
      this.isLoading = true;

      let requestDTO = new Package();

      requestDTO.id = this.selectedPackage!.id;
      requestDTO.name = this.updatePackageForm.controls.packageName.value!;
      requestDTO.refrigerator_numbers = parseInt(this.updatePackageForm.controls.refrigeratorSetting.value!);
      requestDTO.categories_numbers = parseInt(this.updatePackageForm.controls.departmentSetting.value!);
      requestDTO.products_numbers = parseInt(this.updatePackageForm.controls.productSetting.value!);
      requestDTO.heat_alert = this.updatePackageForm.controls.temperatureAlert.value!;
      requestDTO.external_supply = this.updatePackageForm.controls.externalSupply.value!;

      this.updatePackage(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onDeleteButtonClick(id: number) {
    this.selectedPackage = this.packages.find(i => i.id == id);
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deletePackage();
  }

  onCreateButtonClick() {
    if (this.createPackageForm.valid) {

      let requestDTO = new Package();

      requestDTO.name = this.createPackageForm.controls.packageName.value!;
      requestDTO.refrigerator_numbers = parseInt(this.createPackageForm.controls.refrigeratorSetting.value!);
      requestDTO.categories_numbers = parseInt(this.createPackageForm.controls.departmentSetting.value!);
      requestDTO.products_numbers = parseInt(this.createPackageForm.controls.productSetting.value!);
      requestDTO.heat_alert = this.createPackageForm.controls.temperatureAlert.value!;
      requestDTO.external_supply = this.createPackageForm.controls.externalSupply.value!;

      this.isProcessing = true;
      this.isLoading = true;

      console.log(requestDTO)

      this.createPackage(requestDTO);
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  loadPackages() {
    this.isLoading = true;
    let subscription = this.packagesService.getPackages().subscribe(
      (response: any) => {
        this.packages = response.data;
        this.isLoading = false;

      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  createPackage(requestDTO: Package) {
    let subscribtion = this.packagesService.createPackage(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        this.packages = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.key);
      }
    );

    this.subscription.add(subscribtion);
  }

  fetchSelectedWarehouseDataIntoModal() {
    if (this.selectedPackage) {
      this.updatePackageForm.controls.packageName.setValue(this.selectedPackage.name);
      this.updatePackageForm.controls.refrigeratorSetting.setValue(String(this.selectedPackage.refrigerator_numbers));
      this.updatePackageForm.controls.productSetting.setValue(String(this.selectedPackage.products_numbers));
      this.updatePackageForm.controls.departmentSetting.setValue(String(this.selectedPackage.categories_numbers));
      this.updatePackageForm.controls.temperatureAlert.setValue(this.selectedPackage.heat_alert);
      this.updatePackageForm.controls.externalSupply.setValue(this.selectedPackage.external_supply);
    }
  }

  updatePackage(requestDTO: Package) {

    let subscription = this.packagesService.updatePackage(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let updatedPackage = this.packages.find(i => i.id == requestDTO.id);
        Object.assign(updatedPackage!, response.data);

        this.isLoading = false;
      }, (error: any) => {

        this.isProcessing = false;
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }


  deletePackage() {
    let subscription = this.packagesService.deletePackage(this.selectedPackage!.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.packages = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

}
