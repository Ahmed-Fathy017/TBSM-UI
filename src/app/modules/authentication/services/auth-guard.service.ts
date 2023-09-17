import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../remote-services/authentication.service';
import { LocalService } from '../../shared-components/services/local.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate, CanActivateChild {

  permissions: string[] = [];

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private localService: LocalService) {
    this.permissions = JSON.parse(this.localService.getData("permissions"));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!this.authenticationService.isAuthenticated()) {
      this.logout();
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authenticationService.isAuthenticated()) {
      this.logout();
      return false;
    }

    let screenConfig = childRoute.data.config;

    if (screenConfig === 'public' || screenConfig === undefined)
    return true;

    if (!this.permissions.find(i => i === screenConfig))
      return false;

    return true;
  }

  logout() {
    this.localService.clearData();
    this.router.navigate(["login"]);
  }
}
