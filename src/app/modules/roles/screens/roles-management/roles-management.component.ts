import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RolesService } from '../../remote-services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';
import { PermissionGroup } from '../../models/permission-group';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent implements OnInit, OnDestroy {


  subscription = new Subscription();

  firstPageTitle: string = 'RolesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'RolesManagementScreen.ColoredPrimaryTitle'
  // secondPageTitle: string = 'RolesManagementScreen.SecondaryPageTitle';

  createRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required])
  });

  permissionGroups: PermissionGroup[] = [];
  roles: Role[] = [];
  selectedRole: Role = new Role();

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
    this.getRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteButtonClick(id: string) {
    this.selectedRole = this.roles.find(i => i.id === id)!;
  }

  onDeleteConfirmationButtonClick() {
    this.deleteRole();
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


  
}
