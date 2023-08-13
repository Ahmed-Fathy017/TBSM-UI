import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { adminNavbarData, userNavbarData } from '../../models/nav-data';
import { animate, style, transition, trigger } from '@angular/animations';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';

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
  lang!: string;

  constructor(private localService: LocalService) {

    if (localService.getData('type') === UserTypes.ADMIN)
      this.navData = adminNavbarData;
    else
      this.navData = userNavbarData;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.lang = this.localService.getData('lang') === 'en' ? 'en' : 'ar';

  }

  @HostListener('window.resize', ['event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  // @HostListener('window:click', ['$event'])
  // onClick(event: any) {
  //   // console.log(this.collapsed)
  //   // if (this.collapsed)
  //   //   this.collapsed = false;
  //   // this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

  //   if (!this.collapsed)
  //     this.toggleCollapse()
  // }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  // toggleCollapsee() {
  //   if (this.collapsed) {
  //     this.collapsed = !this.collapsed;
  //   this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  //   }
  // }

  closeSideNav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
