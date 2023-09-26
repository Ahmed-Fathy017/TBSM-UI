import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { SideNavToggle } from '../../models/sidenav-toggle';
import { TranslateService } from '@ngx-translate/core';
// import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  lang: string = '';
  userName: string = '';
  initials: string = '';

  constructor(private navService: NavigationService,
    private router: Router,
    private localService: LocalService,
    private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.userName = this.localService.getData('username');
    this.initials = this.userName.charAt(0);
    this.lang = sessionStorage.getItem('lang')!;
    // this.languageService.getAppLanguage().subscribe((state) => {
    //   this.lang = state;
    // });
  }

  changeLanguage(event: any) {

    // this.translateService.setDefaultLang(event.target.value);
    // this.languageService.setAppLanguage(event.target.value);
    sessionStorage.setItem('lang', event.target.data)
    window.location.reload();

    // this.languageService.getAppLanguage().subscribe((state) => {
    //   this.lang = state;
    //   // console.log(state)
    // });

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
