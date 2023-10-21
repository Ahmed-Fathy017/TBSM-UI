import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/screens/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from './modules/shared-components/shared-components.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MasterLayoutModule } from './modules/master-layout/master-layout.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.service';
import { AuthenticationService } from './modules/authentication/remote-services/authentication.service';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxBarcodeModule } from 'ngx-barcode';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// const JWT_Module_Options: JwtModuleOptions = {
//   config: {
//     tokenGetter: tokenGetter,
//     allowedDomains: [environment.apiUrl]
//   }
// };

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
    BrowserAnimationsModule,
    NgxBarcodeModule,
    
    // adding JwtModule
    // JwtModule.forRoot(JWT_Module_Options),

    // adding TranslateModule to our imports array along with a configuration object
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: httpTranslateLoaderFactory,
      deps: [HttpClient]
      }
      }) 
    // AuthenticationModule,
    // SharedComponentsModule
  ],
  providers: [
    AuthenticationService,
    // JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule
  ]
})
export class AppModule { }
