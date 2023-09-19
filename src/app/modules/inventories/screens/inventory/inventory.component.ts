import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/departments/models/department';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { OperationTypes } from 'src/app/modules/operation-logs/models/operation-types';
import { OperationLogsService } from 'src/app/modules/operation-logs/remote-services/operation-logs.service';
import { InventoriesService } from '../../remote-services/inventories.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends SharedMessagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'InventoryScreen.PrimaryTitle';
  coloredPageTitle: string = 'InventoryScreen.ColoredPrimaryTitle';

  @ViewChild('modalShowButtonRef') modalShowButtonRef!: ElementRef;


  inventoryImportForm = new FormGroup({
    department: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  inventoryExportForm = new FormGroup({
    department: new FormControl('', [Validators.required])
  });

  validExcelFileExtensions: string[] = ['xlsx', 'xls'];
  selectedFile!: File;

  // page loading
  isLoading: boolean = false;

  // button loading
  isImporting: boolean = false;
  isExporting: boolean = false;

  departments: Department[] = [];


  pageSize: number = 6;

  operationTypes = OperationTypes;

  excelLink: string = '';

  permissions: string[] = [];

  hasImportingAuthority: boolean = true;
  hasExportingAuthority: boolean = true;

  importingAuthorityPermission: string = 'Inventory.import';
  exportingAuthorityPermission: string = 'Inventory.export';


  constructor(private toastr: ToastrService,
    private departmentsService: DepartmentsService,
    private inventoriesService: InventoriesService,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('Inventory');


    this.evaluateScreenPermissions();
  }

  ngOnInit(): void {
    this.getExcelDownlaodableFile();
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onExcelLinkClick() {
    window.open(this.excelLink, "_blank");
  }

  onFileChange(event: any) {

    let uploadedFiles = event.target.files;

    if (uploadedFiles.length == 1) {

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];

        let fileName = String(file.name).toLowerCase();
        let fileFormatValid = this.isValidFileFormat(fileName.slice(fileName.lastIndexOf('.') + 1));

        if (fileFormatValid) {

          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (event: any) => {
            var safeUrl = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
            this.selectedFile = file;
            this.inventoryImportForm.controls.file.setValue(fileName);
          }
        }
      }
    }

  }

  onImportButtonClick() {
    if (this.inventoryImportForm.valid) {
      this.isImporting = true;
      this.importExcelFile();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);

  }

  onExportButtonClick() {
    if (this.inventoryExportForm.valid)
      this.modalShowButtonRef.nativeElement.click();
    else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onExportButtonConfirmationClick(fileType: string) {
    this.isExporting = true;
    this.exportFile(fileType);
  }

  evaluateScreenPermissions() {
    this.permissions = JSON.parse(this.localService.getData("permissions"));

    this.hasImportingAuthority = this.permissions.findIndex(i => i === this.importingAuthorityPermission) != -1? true: false;
    this.hasExportingAuthority = this.permissions.findIndex(i => i === this.exportingAuthorityPermission) != -1? true: false;
  }

  getExcelDownlaodableFile() {
    this.inventoriesService.getDownloadableExcelFile().subscribe(
      (response: any) => {
        this.excelLink = response.data;

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add();
  }

  getDepartments() {

    let subscription = this.departmentsService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  isValidFileFormat(fileExternsion: string): boolean {
    if (this.validExcelFileExtensions.indexOf(fileExternsion) < 0)
      return false;
    else
      return true;
  }

  importExcelFile() {
    let departmentId = parseInt(this.inventoryImportForm.controls.department.value!);
    let subscription = this.inventoriesService.importExcelFile(departmentId, this.selectedFile).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.isImporting = false;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);

        this.isImporting = false;
      }
    );

    this.subscription.add(subscription);
  }

  exportFile(fileType: string) {
    let departmentId = parseInt(this.inventoryExportForm.controls.department.value!);
    let subscription = this.inventoriesService.exportFile(departmentId, fileType).subscribe(
      (response: any) => {
        window.open(response.data, '_blank');
        this.isExporting = false;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);

        this.isExporting = false;
      }
    );

    this.subscription.add(subscription);
  }
}
