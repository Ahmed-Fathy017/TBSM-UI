import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PermissionGroup } from '../../models/permission-group';
import { Role } from '../../models/role';
import { RolesService } from '../../remote-services/roles.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'RolesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'RolesManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'RolesManagementScreen.SecondaryPageTitle';

  createRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required])
  });

  permissionGroups: PermissionGroup[] = [];
  roles: Role[] = [];
  selectedRole!: Role;

  // page loading
  isLoadingPermissions: boolean = false;
  isLoadingRoles: boolean = false;

  // button loading
  isProcessing: boolean = false;


  constructor(
    private toastr: ToasterService,
    private rolesService: RolesService,
    private translateService: TranslateService,
     private screenTitleNavigationService: ScreenTitleNavigationService) {
      super(translateService);
      this.screenTitleNavigationService.setScreenKey('CreateRole');
  }


  // events
  ngOnInit(): void {
    this.getPermissions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {
    if (this.createRoleForm.valid) {
      let role = new Role();

      role.name = this.createRoleForm.controls.roleName.value!;

      // flattening the array into ids
      this.permissionGroups.forEach(group => {
        role.permissions.push(...group.permissions.filter(i => i.checked).map(i => i.id));
      });



      this.isLoadingRoles = true;
      this.isProcessing = true;

      this.createRole(role);
    }
    else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);

  }

  // functions
  getPermissions() {
    this.isLoadingPermissions = true;
    let subscription = this.rolesService.getPermissions().subscribe(
      (response: any) => {
        this.permissionGroups = response.data;

        // setting checked property for both the groups and the
        // permissions to be false by default
        this.permissionGroups.forEach(group => {
          group.checked = false;
          group.permissions.map(i => i.checked = false);
        });

        this.isLoadingPermissions = false;

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
        this.toastr.error(error.error.errors[0].value, error.error.message);
      else
        this.toastr.error(error.error.message);
        this.isLoadingPermissions = false;
      }
    );

    this.subscription.add(subscription);
  }

  createRole(role: Role) {
    let subscribtion = this.rolesService.createRole(role).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.roles = response.data;
        this.isLoadingRoles = false;
        this.isProcessing = false;

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
        this.toastr.error(error.error.errors[0].value, error.error.message);
      else
        this.toastr.error(error.error.message);
        this.isLoadingRoles = false;
        this.isProcessing = false;
      }
    );

    this.subscription.add(subscribtion);
  }

  reevaluateGroupCheckbox(groupName: string, permissionId: string) {
    let group = this.permissionGroups.find(i => i.group_name === groupName);
    if (group) {
      let permission = group.permissions.find(i => i.id === permissionId);

      if (permission)
        permission.checked = !permission.checked;

      group.checked = group.permissions.every(i => i.checked);

    }
  }

  reevaluateGroupPermissionsCheckboxes(groupName: string) {
    let group = this.permissionGroups.find(i => i.group_name === groupName);
    if (group) {
      if (group.checked)
        group.permissions.map(i => i.checked = false);
      else 
        group.permissions.map(i => i.checked = true);
      group.checked = !group.checked;
    }
  }

}
