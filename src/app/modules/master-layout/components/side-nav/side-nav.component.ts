
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { SideNavDirection } from '../../models/side-nav-direction';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  showSideNav!: Observable<boolean>;
  showSideNavValue!: boolean;

  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: SideNavDirection = SideNavDirection.Right;

  constructor(
    private navService: NavigationService,
    private localService: LocalService) { }

  ngOnInit(): void {
    this.showSideNav = this.navService.getShowNav();

    console.log(this.localService.getData('lang'))

    this.direction = this.localService.getData('lang') == 'ar' || null || undefined || ' '? SideNavDirection.Right : SideNavDirection.Left;
  }

  onSidebarClose() {
    this.navService.setShowNav(false);
  }

  getSideNavBarStyle(showNav: Observable<boolean>) {
    let navBarStyle: any = {};

    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';

    // this.showSideNavValue = false;

    showNav.subscribe(
      (value: boolean) => { this.showSideNavValue = value; }
    )

    navBarStyle[this.direction] = (this.showSideNavValue ? 0 : (this.navWidth * -1)) + 'px';

    return navBarStyle;
  }
}


