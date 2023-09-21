import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../../models/login-request';
import { AuthenticationService } from '../../remote-services/authentication.service';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from '../../models/user-types';
import { PermissionGroup } from 'src/app/modules/roles/models/permission-group';
import { Permission } from 'src/app/modules/roles/models/permission';
import { ScreensConfigProvider } from 'src/app/modules/master-layout/providers/screens-config-provider';
import { adminNavbarData, userNavbarData } from 'src/app/modules/master-layout/models/nav-data';
import { INavbarData } from 'src/app/modules/master-layout/models/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*************** Variables **********************/
  @ViewChild('hidden') hidden: any;
  @ViewChild('show') show: any;
  @ViewChild('password') password: any;

  subscription = new Subscription();

  message: string = '';

  showMessage: boolean = false;
  isProcessing: boolean = false;
  returnURL: string = '';

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', Validators.required),
  });

  /*************** Constructor **********************/
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private localStore: LocalService
  ) { }

  /*************** Events  **********************/
  ngOnInit(): void {

    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.returnURL = params['returnUrl'];
    // });

    // this.tryGetUserProfile();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {

    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control)
        control.markAsTouched({ onlySelf: true });
    });

    let userNameControl = this.loginForm.get('userName');
    let passwordControl = this.loginForm.get('password');

    if (this.loginForm.valid) {
      if (userNameControl && passwordControl) {
        this.isProcessing = true;

        let username = userNameControl.value;
        let password = passwordControl.value;

        let requestDTO: LoginRequest = new LoginRequest();
        requestDTO.username = username!.trim();
        requestDTO.password = password!;

        this.isProcessing = true;
        this.login(requestDTO);
      }
    }
  }

  /*************** Functions **********************/

  // show&hide password
  togglePassword() {
    this.show.nativeElement.classList.toggle('show');
    this.show.nativeElement.classList.toggle('hidden');
    this.hidden.nativeElement.classList.toggle('show');
    this.hidden.nativeElement.classList.toggle('hidden');
    if (this.password.nativeElement.type === 'password') {
      this.password.nativeElement.type = 'text';
    } else if (this.password.nativeElement.type === 'text') {
      this.password.nativeElement.type = 'password';
    }
  }

  // login
  login(requestDTO: LoginRequest) {
    // re clearing local storage data
    this.localStore.clearData();
    // resetting navData array
    this.localStore.saveData('navData', JSON.stringify([]));
    // resetting permissions array
    this.localStore.saveData("permissions", JSON.stringify([]));
    
    this.hideErrorMessage();
    let tokenReqSubscription = this.authenticationService
      .login(requestDTO)
      .subscribe(
        (response: any) => {
          this.localStore.saveData('token', response.auth_data.access_token);
          this.localStore.saveData('username', response.data.username);
          this.localStore.saveData('type', response.data.type.toLowerCase());
          this.localStore.saveData('id', String(response.data.id));


          if (this.localStore.getData('type') === UserTypes.ADMIN) {
            this.setupAdminPermissions();
            this.setupAdminNavbarData();
          }
          else if (this.localStore.getData('type') === UserTypes.WAREHOUSE){

            this.setupUserPermissions(response);
            this.setupUserNavbarData();
          }

          this.navigateToHomePage()

          this.isProcessing = false;

        },
        (error: any) => {
          this.isProcessing = false;
          this.showErrorMessage(error.error.message);
        }
      );

    this.subscription.add(tokenReqSubscription);
  }

  setupUserPermissions(response: any) {
    let permissions: string[] = [];
    response.data.permissions.map((i: PermissionGroup) => {
      let groupName = i.group_name;
      i.permissions.map((j: Permission) => {
        let permission = `${groupName}.${j.name}`;
        permissions.push(permission);
      });
    });

    this.localStore.saveData("permissions", JSON.stringify(permissions));
  }

  setupUserNavbarData() {
    let permissions = JSON.parse(this.localStore.getData("permissions"));

    userNavbarData.map((i: INavbarData) => {
      // looping through items
      if (i.items && i.items.length > 0) {
        i.items.map((j: INavbarData) => {
          if (j.screenConfig)
            j.showInMenu = permissions.find((p: string) => p == j.screenConfig) ? true : false;
          else
            j.showInMenu = true;
        });

        // reevaluating the parent module showInMenu state based on the items
        // showInMenu state, if any of the items must be shown in menu the whole module must be shown also
        i.showInMenu = i.items.some(i => i.showInMenu);
      }
      else {
        // if the screenConfig is undefined it means that the show in menu is by default true
        // but if not it means, we need to check if the config of the screen found
        // in the user permissions or not, in order to evaluate the state of the showInMenuFlag
        if (i.screenConfig)
          i.showInMenu = permissions.find((p: string) => p == i.screenConfig) ? true : false;
        else
          i.showInMenu = true;

      }
    });

    this.localStore.saveData('navData', JSON.stringify(userNavbarData));
  }

  setupAdminPermissions() {

    this.localStore.saveData("permissions", JSON.stringify([
      ScreensConfigProvider.AlmostExpiredProductsViewManagementScreen,
      ScreensConfigProvider.ExpiredProductsViewManagementScreen,
      ScreensConfigProvider.EmptyQuantityProductsViewManagementScreen,
      ScreensConfigProvider.LittleQuantityProductsViewManagementScreen,
      ScreensConfigProvider.VairableTemperatureProductsViewManagementScreen
    ]));
  }

  setupAdminNavbarData() {
    // no need for implementation as all the menu items will be shown to
    // the user by default (as two separated arrays, can be enhanced and merged into one array later)
    this.localStore.saveData('navData', JSON.stringify(adminNavbarData));
  }



  navigateToHomePage() {
    if (this.localStore.getData('type') === UserTypes.ADMIN)
      this.router.navigate(['dashboard']);
    else
      this.router.navigate(['warehouses/home']);
  }

  showErrorMessage(message: string) {
    this.message = message;
    this.showMessage = true;
  }

  hideErrorMessage() {
    this.showMessage = false;
  }
}
