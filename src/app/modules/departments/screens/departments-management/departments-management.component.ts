import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departments-management',
  templateUrl: './departments-management.component.html',
  styleUrls: ['./departments-management.component.css']
})
export class DepartmentsManagementComponent  implements OnInit, OnDestroy {
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

  departments: string[] = ['dep1', 'dep1','dep1','dep1','dep1','dep1','dep1','dep1','dep1','dep1']

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateButtonClick(id: string) {

  }

  onDeleteButtonClick(id: string) {
    
  }

  onCreateButtonClick() {
    
  }
}
