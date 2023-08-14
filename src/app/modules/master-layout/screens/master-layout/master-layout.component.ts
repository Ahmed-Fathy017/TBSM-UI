import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  isSideNavCollapsed = false;
  screenwidth = 0;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenwidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed

  }

  // getBodyClass(): string {
  //   let styleClass = '';
  //   if (this.isSideNavCollapsed && this.screenwidth > 768)
  //     styleClass = 'body-trimmed'
  //   else if (this.isSideNavCollapsed && this.screenwidth <= 768 && this.screenwidth > 0)
  //     styleClass = 'body-md-screen'
  //   return styleClass;
  // }

}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
