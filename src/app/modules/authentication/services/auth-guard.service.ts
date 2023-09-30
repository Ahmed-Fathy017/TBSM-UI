import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../remote-services/authentication.service';
import { LocalService } from '../../shared-components/services/local.service';
import { UserTypes } from '../models/user-types';
import { ScreenTitleNavigationService } from '../../master-layout/services/screen-title-navigation.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate, CanActivateChild {


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!this.authenticationService.isAuthenticated()) {
      this.logout();
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let permissions: string[] = JSON.parse(this.localService.getData("permissions"));
    
    if (!this.authenticationService.isAuthenticated()) {
      this.logout();
      return false;
    }

    let screenConfig = childRoute.firstChild?.data.config;

    if (screenConfig === 'public' ||
      screenConfig === undefined ||
      (screenConfig === 'admin' && this.localService.getData('type') == UserTypes.ADMIN) ||
      (screenConfig === 'user' && this.localService.getData('type') != UserTypes.ADMIN))
      return true;

      // this should be map key, value for O(1) execution enhancement
    if (!permissions.find(i => i === screenConfig) ||
      (screenConfig === 'admin' && this.localService.getData('type') != UserTypes.ADMIN) ||
      (screenConfig === 'user' && this.localService.getData('type') == UserTypes.ADMIN)) {
      this.router.navigate(['unauthorized']);
      return false;
    }

    return true;
  }

  logout() {
    this.localService.clearData();
    this.router.navigate(["login"]);
  }
}
