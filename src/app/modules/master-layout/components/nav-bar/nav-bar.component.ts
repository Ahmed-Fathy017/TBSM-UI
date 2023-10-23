import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { SideNavToggle } from '../../models/sidenav-toggle';
import { NavbarService } from '../../services/navbar.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  lang: string = '';
  userName: string = '';
  initials: string = '';

  isAdmin: boolean = false;
  warehouseName: string = '';

  constructor(private navService: NavigationService,
    private router: Router,
    private localService: LocalService,
    private navbarService: NavbarService) {
    this.lang = this.localService.getData('lang') || 'ar';

    // setting isAdmin flag based on the logged in user type
    this.isAdmin = this.localService.getData('type') == UserTypes.ADMIN;
  }

  ngOnInit(): void {
    this.userName = this.localService.getData('username');
    this.initials = this.userName.charAt(0);


    this.navbarService.getWarehouseMode().subscribe((state) => {
      this.warehouseName = state ? this.localService.getData('warehouseName') : '';
    });
  }

  changeLanguage(event: any) {
    this.localService.saveData('lang', event.target.value);
    window.location.reload();
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }

  onLogoutClick() {
    this.logout();
  }

  onResetWarehouseModeButtonClick() {
    this.navbarService.setWarehouseMode(false);
    this.localService.removeData('warehouseName');
    this.localService.removeData('warehouseId');
    this.router.navigate(['dashboard']);
  }

  logout() {
    let lang = this.localService.getData('lang');

    this.localService.clearData();
    this.localService.saveData('lang', lang);
    this.router.navigate(["login"]);
  }

}
