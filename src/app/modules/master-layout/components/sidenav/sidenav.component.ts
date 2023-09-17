import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { adminNavbarData, userNavbarData } from '../../models/nav-data';
import { animate, style, transition, trigger } from '@angular/animations';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';
import { INavbarData } from '../../models/helper';
import { Router } from '@angular/router';

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

  collapsed = false;
  screenWidth = 0;
  navData = adminNavbarData;
  multiple: boolean = false;
  lang!: string;

  constructor(private localService: LocalService,
    private router: Router) {

    this.navData = JSON.parse(this.localService.getData('navData'));

    this.lang = localService.getData('lang') || 'ar';

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

  }

  @HostListener('window.resize', ['event'])
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

  getActiveClass(data: INavbarData) : string {
    return this.router.url.includes(data.routeLink) ? 'active': '';
  }

}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
