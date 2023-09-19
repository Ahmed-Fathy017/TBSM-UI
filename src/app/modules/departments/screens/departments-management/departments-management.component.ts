import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../../remote-services/departments.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-departments-management',
  templateUrl: './departments-management.component.html',
  styleUrls: ['./departments-management.component.css']
})
export class DepartmentsManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'DepartmentsManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'DepartmentsManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'DepartmentsManagementScreen.SecondaryPageTitle';

  createDepartmentForm = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
  });

  updateDepartmentForm = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
  });


  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  departments: Department[] = [];
  selectedDepartment: Department = new Department();

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  constructor(private toastr: ToastrService,
    private departmentsService: DepartmentsService,
    private translateService: TranslateService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
      super(translateService);
      this.screenTitleNavigationService.setScreenKey('DepartmentsManagement');
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateButtonClick(id: number) {
    this.selectedDepartment = this.departments.find(i => i.id === id)!;
    this.fetchSelectedDepartmentDataIntoModal();

  }

  onUpdateConfirmationClick() {
    if (this.updateDepartmentForm.valid) {
      this.isLoading = true;

      let department = new Department();

      department.id = this.selectedDepartment.id!;
      department.name = this.updateDepartmentForm.controls.departmentName.value!;

      this.updateDepartment(department);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onDeleteButtonClick(id: number) {
    this.selectedDepartment = this.departments.find(i => i.id === id)!;
  }

  onDeleteConfirmationButtonClick() {
    this.deleteDepartment();

    this.isLoading = true;
  }

  onCreateButtonClick() {
    if (this.createDepartmentForm.valid) {

      let requestDTO = new Department();

      requestDTO.name = this.createDepartmentForm.controls.departmentName.value!;

      this.isProcessing = true;
      this.isLoading = true;

      this.createDepartment(requestDTO);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }



  getDepartments() {
    this.isLoading = true;

    let subscription = this.departmentsService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  createDepartment(requestDTO: Department) {
    let subscribtion = this.departmentsService.createDepartment(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        this.departments = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  deleteDepartment() {
    let subscribtion = this.departmentsService.deleteDepartment(this.selectedDepartment.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.departments = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  fetchSelectedDepartmentDataIntoModal() {
    if (this.selectedDepartment) {
      this.updateDepartmentForm.controls.departmentName.setValue(this.selectedDepartment.name);
    }
  }

  updateDepartment(requestDTO: Department) {

    let subscription = this.departmentsService.updateDepartment(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let updatedDepartment = this.departments.find(i => i.id == requestDTO.id);
        Object.assign(updatedDepartment!, response.data);

        this.isLoading = false;
      }, (error: any) => {

        this.isLoading = false;
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }
}
