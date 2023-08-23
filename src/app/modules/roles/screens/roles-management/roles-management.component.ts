import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RolesService } from '../../remote-services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';

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

  permissions: Permission[] = [];
  roles: Role[] = [];
  selectedRole!: Role;

  // page loading
  isLoadingPermissions: boolean = false;
  isLoadingRoles: boolean = false;

  // button loading
  isProcessing: boolean = false;


  constructor(
    private toastr: ToastrService,
    private rolesService: RolesService) {


  }


  // events
  ngOnInit(): void {
    this.getPermissions();
    this.getRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {
    if (this.createRoleForm.valid) {
      let role = new Role();

      role.name = this.createRoleForm.controls.roleName.value!;
      role.permissions = this.permissions.filter(i => i.checked).map(i => i.id);


      this.isLoadingRoles = true;
      this.isProcessing = true;

      this.createRole(role);
    }
    else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');

  }

  onDeleteButtonClick(id: string) {
    this.selectedRole = this.roles.find(i => i.id === id)!;
  }

  onDeleteConfirmationButtonClick() {
    this.deleteRole();
  }


  // functions
  getPermissions() {
    this.isLoadingPermissions = true;
    let subscription = this.rolesService.getPermissions().subscribe(
      (response: any) => {
        this.permissions = response.data;
        this.permissions.map(i => i.checked = false);
        this.isLoadingPermissions = false;
        console.log(this.permissions)

      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoadingPermissions = false;
      }
    );

    this.subscription.add(subscription);
  }

  getRoles() {
    this.isLoadingRoles = true;
    let subscription = this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
        this.isLoadingRoles = false;
      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoadingRoles = false;
      }
    );

    this.subscription.add(subscription);
  }

  deleteRole() {
    this.isLoadingRoles = true;

    let subscribtion = this.rolesService.deleteRole(this.selectedRole.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.roles = response.data;
        this.isLoadingRoles = false;

      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoadingRoles = false;
      }
    );

    this.subscription.add(subscribtion);
  }


  createRole(role: Role) {
    let subscribtion = this.rolesService.createRole(role).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.roles = response.data;
        this.isLoadingRoles = false;
        this.isProcessing = false;

      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoadingRoles = false;
        this.isProcessing = false;
      }
    );

    this.subscription.add(subscribtion);
  }
}
