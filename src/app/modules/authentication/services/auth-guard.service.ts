import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../remote-services/authentication.service';
import { LocalService } from '../../shared-components/services/local.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private localService: LocalService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authenticationService.isAuthenticated()) {
      this.logout();
      return false;
    }
    return true;
  }

  logout() {
    this.localService.clearData();
    this.router.navigate(["login"]);
  }
}
