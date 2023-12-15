import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { PermissionGroup } from '../../models/permission-group';
import { Role } from '../../models/role';
import { RolesService } from '../../remote-services/roles.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { Permission } from '../../models/permission';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent extends SharedMessagesComponent implements OnInit, OnDestroy, AfterViewInit {

  subscription = new Subscription();

  firstPageTitle: string = 'RolesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'RolesManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'RolesManagementScreen.SecondaryPageTitle';

  updateRoleForm = new FormGroup({
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

  lang: string = '';

  roleId: string = '';
  role: any = null;

  rolePermissionIds: string[] = [];

  @ViewChildren('contentWrapper') contentWrappers!: QueryList<ElementRef>;

  constructor(
    private toastr: ToasterService,
    private rolesService: RolesService,
    private translateService: TranslateService,
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private localService: LocalService,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('UpdateRole');
    this.lang = localService.getData('lang');
  }

  // events
  ngOnInit(): void {
    this.roleId = this.activatedRoute.snapshot.paramMap.get('id')!;


    this.getRoles();
  }

  ngAfterViewInit(): void {
    this.checkScrollbar();
  }


  ngOnDestroy(): void {
    this.localService.removeData('roleId');
    this.localService.removeData('roleName');
    this.subscription.unsubscribe();
  }

  // Check if the content overflows and adjust the scrollbar visibility
  checkScrollbar() {
    this.contentWrappers.changes.subscribe(() => {
      this.contentWrappers.toArray().forEach((contentWrapper) => {
        const contentWrapperElement = contentWrapper.nativeElement as HTMLElement;

        if (this.lang != 'en')
          this.renderer.setStyle(contentWrapperElement, 'direction', 'ltr');
        else
          this.renderer.setStyle(contentWrapperElement, 'direction', 'rtl');

        if (contentWrapperElement.scrollHeight > contentWrapperElement.clientHeight) {
          this.renderer.setStyle(contentWrapperElement, 'overflow-y', 'scroll');
          if (this.lang != 'en')
            this.renderer.setStyle(contentWrapperElement, 'margin-left', '5.5px');
          else
            this.renderer.setStyle(contentWrapperElement, 'margin-right', '5.5px');

        } else {
          this.renderer.setStyle(contentWrapperElement, 'overflow-y', 'hidden');
          this.renderer.setStyle(contentWrapperElement, 'margin', '0 5.8px');
        }
      });
    });
  }

  onUpdateButtonClick() {
    Object.keys(this.updateRoleForm.controls).forEach(field => {
      const control = this.updateRoleForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if (this.updateRoleForm.valid) {
      let role = new Role();

      role.id = this.role.id;
      role.name = this.updateRoleForm.controls.roleName.value!;

      // flattening the array into ids
      this.permissionGroups.forEach(group => {
        role.permissions.push(...group.permissions.filter(i => i.checked).map(i => i.id));
      });

      this.isProcessing = true;

      this.updateRole(role);
    }
    else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);

  }

  // functions

  getRoles() {
    this.isLoadingPermissions = true;

    let subscription = this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
        this.role = this.roles.find(i => i.id == this.roleId)!;

        this.updateRoleForm.controls.roleName.setValue(this.role.name);

        this.setupRolePermissionsArray();

        // getting all permissions after loading of the role itself
        this.getPermissions();

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);

      }
    );

    this.subscription.add(subscription);
  }

  setupRolePermissionsArray() {
    this.role.permissions.map((i: any) => {
      this.rolePermissionIds.push(...i.permissions.map((p: Permission) => p.id));
    });
  }

  getPermissions() {
    this.isLoadingPermissions = true;
    let subscription = this.rolesService.getPermissions().subscribe(
      (response: any) => {
        this.permissionGroups = response.data;

        // setting checked property for both the groups and the
        // permissions to be false by default
        const idSet = new Set(this.rolePermissionIds);

        this.permissionGroups.forEach(group => {

          group.permissions.map(i => {
            if (idSet.has(i.id))
              i.checked = true;
            else
              i.checked = false
          });

          group.checked = group.permissions.every(i => i.checked) ? true : false;

          // reversing the categories group permissions
          // to solve the problem of english words after
          // the arabic words
          if (group.group_name_en.toLowerCase() == 'categories')
            group.permissions.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        });

        this.isLoadingPermissions = false;

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
        this.isLoadingPermissions = false;
      }
    );

    this.subscription.add(subscription);
  }

  updateRole(role: Role) {
    let subscribtion = this.rolesService.updateRole(role).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successCreateOperationHeader);
        this.roles = response.data;
        this.isProcessing = false;

        this.router.navigate(['roles']);

      }, (error: any) => {
        this.isProcessing = false;

        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);

      }
    );

    this.subscription.add(subscribtion);
  }

  reevaluateGroupCheckbox(groupName: string, permissionId: string) {
    let group = this.permissionGroups.find(i => i.group_name_en === groupName);
    if (group) {
      let permission = group.permissions.find(i => i.id === permissionId);

      if (permission)
        permission.checked = !permission.checked;

      group.checked = group.permissions.every(i => i.checked);

    }
  }

  reevaluateGroupPermissionsCheckboxes(groupName: string) {
    let group = this.permissionGroups.find(i => i.group_name_en === groupName);
    if (group) {
      if (group.checked)
        group.permissions.map(i => i.checked = false);
      else
        group.permissions.map(i => i.checked = true);
      group.checked = !group.checked;
    }
  }
}
