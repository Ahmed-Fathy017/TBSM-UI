import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { SideNavToggle } from '../../models/sidenav-toggle';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  
  lang: string = '';
  userName: string = '';

  constructor(private navService: NavigationService,
    private router: Router,
    private localService: LocalService) {
    this.lang = this.localService.getData('lang') || 'ar';
  }

  ngOnInit(): void {
    this.userName = this.localService.getData('username');
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

  logout() {
    this.localService.clearData();
    this.router.navigate(["login"]);
  }

}
