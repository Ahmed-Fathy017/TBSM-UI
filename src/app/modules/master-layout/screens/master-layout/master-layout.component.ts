import { Component, HostListener, Input, OnInit } from '@angular/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  isSideNavCollapsed = false;
  screenWidth = 0;

  lang: string = '';


  // @Input() collapsed = false;
  // @Input() screenwidth = 0;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.lang = this.localService.getData('lang');

  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }


  getBodyClass(): string {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768)
      styleClass = this.lang !== 'en' ? 'body-trimmed-arabic' : 'body-trimmed-english';
    else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0)
      styleClass = this.lang !== 'en' ? 'body-md-screen-arabic' : 'body-md-screen-english';
    return styleClass;
  }

}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
