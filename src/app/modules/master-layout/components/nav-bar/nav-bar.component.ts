import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private navService: NavigationService,
    private router: Router,
    private localService: LocalService) { }

  ngOnInit(): void {
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
