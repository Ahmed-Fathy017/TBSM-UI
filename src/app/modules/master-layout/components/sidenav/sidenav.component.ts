import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { adminNavbarData, userNavbarData } from '../../models/nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';
import { INavbarData } from '../../models/helper';
import { Router } from '@angular/router';
import { SideNavToggle } from '../../models/sidenav-toggle';
import { NavbarService } from '../../services/navbar.service';
import { adminPermissions } from '../../models/permissions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = true;
  screenWidth = 0;
  navData = adminNavbarData;
  multiple: boolean = false;
  lang!: string;

  constructor(private localService: LocalService,
    private navbarService: NavbarService,
    private router: Router) {

    this.navData = JSON.parse(this.localService.getData('navData'));

    this.lang = localService.getData('lang') || 'ar';

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth < 768)
      this.collapsed = false;

    // warehouse mode change subscription 
    this.navbarService.getWarehouseMode().subscribe((state) => {
      if (this.localService.getData('type') == UserTypes.ADMIN) {
        let data = '';
        let permissions = '';

        if (state) {
          // resetting all showInMenu flag for items and sub-items
          // to true so it will be shown for the admin user
          // (can be enhanced by creating temp varaible array with all showInMenu with true values)
          userNavbarData.map(i => {
            i.showInMenu = true;
            if (i.items && i.items.length > 0)
              i.items.map(i => i.showInMenu = true);

          });

          data = JSON.stringify(userNavbarData);
          
          // permissions = JSON.stringify(secondaryAdminPermissions);
        }
        else {
          data = JSON.stringify(adminNavbarData);
          permissions = JSON.stringify(adminPermissions);
        }

        this.localService.saveData('navData', data);
        // this.localService.saveData('permissions', permissions);

        this.navData = JSON.parse(data);
      }
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSideNav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  handleClick(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    if (this.lang != 'en')
      return this.router.url.includes(data.routeLink) ? 'active-rtl' : 'custom-border-rtl';
    else
      return this.router.url.includes(data.routeLink) ? 'active-ltr' : 'custom-border-ltr';
  }

}

