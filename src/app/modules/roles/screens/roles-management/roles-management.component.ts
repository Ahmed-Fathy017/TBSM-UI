import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent implements OnInit, OnDestroy {


  subscription = new Subscription();

  firstPageTitle: string = 'RolesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'RolesManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'RolesManagementScreen.SecondaryPageTitle';

  createRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required])
  });

  roles: string[] = ['Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1', 'Role1']


  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {

  }

  onDeleteButtonClick() {

  }


}
