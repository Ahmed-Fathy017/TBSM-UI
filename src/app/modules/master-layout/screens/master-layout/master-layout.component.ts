import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { ScreenTitleNavigationService } from '../../services/screen-title-navigation.service';
import { IScreenNavigator } from '../../models/screen-navigator';
import { NgZone } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  isSideNavCollapsed = false;
  screenWidth = 0;

  lang: string = '';

  // just initial value should be changed later based on user type
  screenNavigators: IScreenNavigator[] = [{ name: 'ScreenNames.Home', routeLink: 'warehouses/home' }];

  constructor(private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {

  }

  ngOnInit(): void {
    this.lang = this.localService.getData('lang');

    this.screenTitleNavigationService.getScreenKey().subscribe((state) => {
      // This code will only run when the getScreenKey() observable emits a value
      if (this.screenTitleNavigationService.getTitleNavigationDetails(state)) {
        this.screenNavigators = this.screenTitleNavigationService.getTitleNavigationDetails(state, { name: this.localService.getData('warehouseName'), id: this.localService.getData('warehouseId') });
      }
    });

    // initial state for expanded menu
    this.isSideNavCollapsed = true;
    this.screenWidth = window.innerWidth;
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
    console.log(styleClass)
    return styleClass;
  }

}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
