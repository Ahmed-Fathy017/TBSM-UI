import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalService } from '../../shared-components/services/local.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends AbstractRemoteService {

  constructor(private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private localService: LocalService) {
    super()
  }

  login(requestDTO: LoginRequest) {

    let apiRoute = this.apiURl + 'auth/login';    
    
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept-Language', 'ar');
    let options = { headers: httpHeaders };

    return this.http.post(apiRoute, requestDTO, options);
  }

  // ...
  isAuthenticated(): boolean {
    const token = this.localService.getData('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
