import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/modules/packages/models/package';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';
import { Role } from 'src/app/modules/roles/models/role';
import { RolesService } from 'src/app/modules/roles/remote-services/roles.service';
import { UsersService } from '../../remote-services/users.service';
import { User } from '../../models/user';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'UsersManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'UsersManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'UsersManagementScreen.SecondaryPageTitle';

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  roles: Role[] = [];
  users: User[] = [];
  selectedUser: User = new User();

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  createUserForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  updateUserForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    role: new FormControl('', [Validators.required])
  });

  permissions: string[] = [];

  hasCreatingAuthority: boolean = true;
  hasDeletingAuthority: boolean = true;
  hasUpdatingAuthority: boolean = true;

  creatingAuthorityPermission: string = 'Users.create';
  deletingAuthorityPermission: string = 'Users.delete';
  updatingAuthorityPermission: string = 'Users.update';

  constructor(
    private toastr: ToasterService,
    private rolesService: RolesService,
    private usersService: UsersService,
    private translateService: TranslateService,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('UsersManagement');

    this.evaluateScreenPermissions();
  }

  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {
    if (this.createUserForm.valid) {

      let requestDTO = new User();

      requestDTO.username = this.createUserForm.controls.username.value!;
      requestDTO.fullname = this.createUserForm.controls.fullname.value!;
      requestDTO.password = this.createUserForm.controls.password.value!;
      requestDTO.role_id = parseInt(this.createUserForm.controls.role.value!);

      this.isProcessing = true;
      this.isLoading = true;

      this.createUser(requestDTO);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onDeleteButtonClick(id: number) {
    this.selectedUser = this.users.find(i => i.id == id)!;
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deleteUser();
  }

  onUpdateButtonClick(id: number) {
    this.selectedUser = this.users.find(i => i.id == id)!;
    this.fetchSelectedDataIntoModal();
  }

  onUpdateConfirmationClick() {
    if (this.updateUserForm.valid) {
      this.isLoading = true;

      let requestDTO = new User();

      requestDTO.id = this.selectedUser!.id;
      requestDTO.fullname = this.updateUserForm.controls.fullname.value!;
      requestDTO.username = this.updateUserForm.controls.username.value!;
      requestDTO.password = this.updateUserForm.controls.password.value!;
      requestDTO.role_id = parseInt(this.updateUserForm.controls.role.value!);

      this.updateUser(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  // functions
  evaluateScreenPermissions() {
    this.permissions = JSON.parse(this.localService.getData("permissions"));
    this.hasCreatingAuthority = this.permissions.findIndex(i => i === this.creatingAuthorityPermission) != -1 ? true : false;
    this.hasDeletingAuthority = this.permissions.findIndex(i => i === this.deletingAuthorityPermission) != -1 ? true : false;
    this.hasUpdatingAuthority = this.permissions.findIndex(i => i === this.updatingAuthorityPermission) != -1 ? true : false;
  }

  getRoles() {
    let subscription = this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(this.errorOperationHeader,error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  getUsers() {
    this.isLoading = true;

    let subscription = this.usersService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data;

        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(this.errorOperationHeader,error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  createUser(requestDTO: User) {
    let subscribtion = this.usersService.createUser(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(this.successCreateOperationHeader,response.message);

        this.users = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(this.errorOperationHeader,error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  fetchSelectedDataIntoModal() {
    if (this.selectedUser) {
      this.updateUserForm.controls.username.setValue(this.selectedUser.username);
      this.updateUserForm.controls.fullname.setValue(this.selectedUser.fullname);
      this.updateUserForm.controls.role.setValue(String(this.selectedUser.role_id ?? this.selectedUser.role.id));
    }
  }

  updateUser(requestDTO: User) {
    let subscription = this.usersService.updateUser(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(this.successEditOperationHeader, response.message);

        let updatedRefrigerator = this.users.find(i => i.id == requestDTO.id);
        Object.assign(updatedRefrigerator!, response.data);

        this.isLoading = false;
      }, (error: any) => {

        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(this.errorOperationHeader,error.error.message);
      }
    );

    this.subscription.add(subscription);
  }


  deleteUser() {
    let subscription = this.usersService.deleteUser(this.selectedUser.id).subscribe(
      (response: any) => {
        this.toastr.success(this.successDeleteOperationHeader, response.message);
        this.users = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(this.errorOperationHeader,error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

}
