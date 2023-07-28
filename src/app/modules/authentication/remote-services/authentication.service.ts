import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends AbstractRemoteService {

  constructor(private http: HttpClient) {
    super()
  }

  login(requestDTO: LoginRequest) {

    let apiRoute = this.apiURl + 'auth/login';    
    
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept-Language', 'ar')
    let options = { headers: httpHeaders };

    return this.http.post(apiRoute, requestDTO, options);
  }
}
