import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../../models/login-request';
import { AuthenticationService } from '../../remote-services/authentication.service';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from '../../models/user-types';

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

        // setTimeout(() => {
        //   this.isProcessing = false;
        //   this.router.navigate(['dashboard']);
        // }, 2000);

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
    this.hideErrorMessage();
    let tokenReqSubscription = this.authenticationService
      .login(requestDTO)
      .subscribe(
        (response: any) => {
          this.localStore.saveData('token', response.auth_data.access_token);
          this.localStore.saveData('username', response.data.username);
          this.localStore.saveData('type', response.data.type);
          this.localStore.saveData('id', String(response.data.id));

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
