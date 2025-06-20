import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './screens/login/login.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './remote-services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService,
    JwtHelperService
  ]
})
export class AuthenticationModule { }
