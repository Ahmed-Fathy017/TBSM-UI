import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Package } from '../../models/package';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../remote-services/packages.service';
// import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';

@Component({
  selector: 'app-packages-management',
  templateUrl: './packages-management.component.html',
  styleUrls: ['./packages-management.component.css']
})
export class PackagesManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'PackagesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'PackagesManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'PackagesManagementScreen.SecondaryPageTitle';

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

  permissions: string[] = [];

  hasCreatingAuthority: boolean = true;
  hasDeletingAuthority: boolean = true;
  hasUpdatingAuthority: boolean = true;

  creatingAuthorityPermission: string = 'Categories.create';
  deletingAuthorityPermission: string = 'Categories.delete';
  updatingAuthorityPermission: string = 'Categories.update';

  constructor(
    private toastr: ToasterService,
    private packagesService: PackagesService,
    private translateService: TranslateService,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('PackagesManagement')
    this.evaluateScreenPermissions();

  }


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
      requestDTO.heat_alert = this.updatePackageForm.controls.temperatureAlert.value! == true ? 1 : 0;
      requestDTO.external_supply = this.updatePackageForm.controls.externalSupply.value! == true ? 1 : 0;

      this.updatePackage(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
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
      requestDTO.heat_alert = this.createPackageForm.controls.temperatureAlert.value! == true ? 1 : 0;
      requestDTO.external_supply = this.createPackageForm.controls.externalSupply.value! == true ? 1 : 0;

      this.isProcessing = true;
      this.isLoading = true;

      this.createPackage(requestDTO);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  // functions
  evaluateScreenPermissions() {
    this.permissions = JSON.parse(this.localService.getData("permissions"));
    if (this.permissions.length > 0) {
      this.hasCreatingAuthority = this.permissions.findIndex(i => i === this.creatingAuthorityPermission) != -1 ? true : false;
      this.hasDeletingAuthority = this.permissions.findIndex(i => i === this.deletingAuthorityPermission) != -1 ? true : false;
      this.hasUpdatingAuthority = this.permissions.findIndex(i => i === this.updatingAuthorityPermission) != -1 ? true : false;
    }
    
  }

  loadPackages() {
    this.isLoading = true;
    let subscription = this.packagesService.getPackages().subscribe(
      (response: any) => {
        this.packages = response.data;
        this.isLoading = false;

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  createPackage(requestDTO: Package) {
    let subscribtion = this.packagesService.createPackage(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successCreateOperationHeader);

        this.packages = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
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
      this.updatePackageForm.controls.temperatureAlert.setValue(this.selectedPackage.heat_alert == 1 ? true : false);
      this.updatePackageForm.controls.externalSupply.setValue(this.selectedPackage.external_supply == 1 ? true : false);
    }
  }

  updatePackage(requestDTO: Package) {

    let subscription = this.packagesService.updatePackage(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success( response.message, this.successEditOperationHeader);

        let updatedPackage = this.packages.find(i => i.id == requestDTO.id);
        Object.assign(updatedPackage!, response.data);

        this.isLoading = false;
      }, (error: any) => {

        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }


  deletePackage() {
    let subscription = this.packagesService.deletePackage(this.selectedPackage!.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successDeleteOperationHeader);
        this.packages = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }

}
