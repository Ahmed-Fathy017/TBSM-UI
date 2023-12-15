import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RolesService } from '../../remote-services/roles.service';
// import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';
import { PermissionGroup } from '../../models/permission-group';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

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
    private toastr: ToasterService,
    private rolesService: RolesService,
    private localService: LocalService,
    private router: Router,
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private translateService: TranslateService) {
    super(translateService);
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

  onUpdateButtonClick(id: string, name: string) {
    this.localService.saveData('roleId', String(id));
    this.localService.saveData('roleName', name);
    this.router.navigate([`roles/update/${id}`]);
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
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
        this.isLoadingRoles = false;
      }
    );

    this.subscription.add(subscription);
  }

  deleteRole() {
    this.isLoadingRoles = true;

    let subscribtion = this.rolesService.deleteRole(this.selectedRole.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successDeleteOperationHeader);
        this.roles = response.data;
        this.isLoadingRoles = false;

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
        this.isLoadingRoles = false;
      }
    );

    this.subscription.add(subscribtion);
  }



}
