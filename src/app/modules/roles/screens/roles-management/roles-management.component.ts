import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RolesService } from '../../remote-services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';
import { PermissionGroup } from '../../models/permission-group';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

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

  permissions: string[] = [];

  hasDeletingAuthority: boolean = true;
  hasUpdatingAuthority: boolean = true;

  deletingAuthorityPermission: string = 'Roles.delete';
  updatingAuthorityPermission: string = 'Roles.update';

  constructor(
    private toastr: ToastrService,
    private rolesService: RolesService,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
    this.screenTitleNavigationService.setScreenKey('RolesManagement');
    this.evaluateScreenPermissions();
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

  // functions
  evaluateScreenPermissions() {
    this.permissions = JSON.parse(this.localService.getData("permissions"));

    this.hasDeletingAuthority = this.permissions.findIndex(i => i === this.deletingAuthorityPermission) != -1 ? true : false;
    this.hasUpdatingAuthority = this.permissions.findIndex(i => i === this.updatingAuthorityPermission) != -1 ? true : false;
  }

  getRoles() {
    this.isLoadingRoles = true;
    let subscription = this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
        this.isLoadingRoles = false;
      }, (error: any) => {
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
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
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
        this.isLoadingRoles = false;
      }
    );

    this.subscription.add(subscribtion);
  }



}
