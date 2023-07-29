import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/screens/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from './modules/shared-components/shared-components.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MasterLayoutModule } from './modules/master-layout/master-layout.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.service';
import { AuthenticationService } from './modules/authentication/remote-services/authentication.service';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      // tokenGetter: yourTokenGetter,
      allowedDomains: [environment.apiUrl]
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MasterLayoutModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options)
    // AuthenticationModule,
    // SharedComponentsModule
  ],
  providers: [
    AuthenticationService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
