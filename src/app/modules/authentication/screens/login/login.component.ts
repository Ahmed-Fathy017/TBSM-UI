import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
      private router: Router
    ) {  }
  
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

          setTimeout(() => {
            this.isProcessing = false;
            this.router.navigate(['dashboard']);
          }, 2000);
          // let username = userNameControl.value;
          // let password = passwordControl.value;
          // let tokenRequestDTO: TokenRequestDTO = new TokenRequestDTO();
          // tokenRequestDTO.Username = username.trim();
          // tokenRequestDTO.Password = password;
          // this.isProcessing = true;
          // this.login(tokenRequestDTO);
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
    // login(tokenRequestDTO: TokenRequestDTO) {
    //   this.hideErrorMessage();
    //   let tokenReqSubscription = this.authRemoteService
    //     .login(tokenRequestDTO)
    //     .subscribe(
    //       (loginResult) => {
    //         let successResponse = loginResult as BaseSuccessResponse;
    //         let auth: AuthInfoModel = new AuthInfoModel();
    //         auth.userName = tokenRequestDTO.Username;
    //         auth.token = successResponse.Data.AccessToken;
    //         auth.refreshToken = successResponse.Data.RefreshTokenString;
    //         auth.tokenExpiryTime = successResponse.Data.RefreshTokenExpiry;
  
    //         // set the authentication values to the AuthInfoModel object in the app shared object
    //         this.sharedObject.setAuthInfo(auth);
    //         this.getUserProfile();
  
    //       },
    //       (error: BaseErrorResponse) => {
    //         this.isProcessing = false;
    //         this.showErrorMessage(error.Message);
    //       }
    //     );
  
    //   this.subscription.add(tokenReqSubscription);
    // }
  
    // tryGetUserProfile() {
    //   let authInfo = this.sharedObject.getAuthInfo();
  
    //   if (ObjectUtilities.HasValue(authInfo.userName) && authInfo.userName != '')
    //     this.redirectTolandingPage();
    // }
  
    // getUserProfile() {
    //   let getUserProfileSubscription = this.authRemoteService.getUserProfile().subscribe(
    //     (result) => {
    //       let successGetUserProfileResponse = result as BaseSuccessResponse;
    //       let userModel: UserInfoModel =
    //         successGetUserProfileResponse.Data as UserInfoModel;
  
    //       // set the user info values to the AuthInfoModel object in the app shared object
    //       this.sharedObject.setUserInfo(userModel);
    //       let authInfo = this.sharedObject.getAuthInfo();
  
    //       if (successGetUserProfileResponse.Data.AuthorizedUiComponents && successGetUserProfileResponse.Data.AuthorizedUiComponents.length > 0) {
    //         authInfo.AuthorizedUiComponents = successGetUserProfileResponse.Data.AuthorizedUiComponents;
    //         this.sharedObject.setAuthInfo(authInfo);
  
    //         // redirect to the landing screen
    //         this.redirectTolandingPage();
    //       }
    //       else {
    //         this.showErrorMessage("Invalid User Profile");
    //       }
    //       this.isProcessing = false;
  
    //     },
    //     (error: BaseErrorResponse) => {
    //       this.isProcessing = false;
    //       this.showErrorMessage(error.Message);
    //     }
    //   );
    //   this.subscription.add(getUserProfileSubscription);
    // }
  
  
    showErrorMessage(message: string) {
      this.message = message;
      this.showMessage = true;
    }
  
    hideErrorMessage() {
      this.showMessage = false;
    }
  
    redirectTolandingPage() {
  
      // if (ObjectUtilities.HasValue(this.returnURL) && this.returnURL != '')
      //   this.router.navigateByUrl(this.returnURL);
      // else
        this.router.navigateByUrl('/menu');
    }
  
    //forget password
    forgetpassword() {
      this.router.navigate(['/forgetpassword']);
    }
  
    //signup
    signup() {
      // this.router.navigate(['/signup']);
    }

}
