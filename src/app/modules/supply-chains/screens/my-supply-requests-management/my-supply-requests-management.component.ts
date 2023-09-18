import { Component } from '@angular/core';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-my-supply-requests-management',
  templateUrl: './my-supply-requests-management.component.html',
  styleUrls: ['./my-supply-requests-management.component.css']
})
export class MySupplyRequestsManagementComponent {

  firstPageTitle: string = 'SupplyRequetsManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'SupplyRequetsManagementScreen.MyRequestsColoredPrimaryTitle';

  constructor(private screenTitleNavigationService: ScreenTitleNavigationService) {
    this.screenTitleNavigationService.setScreenKey('MySupplyRequests');
  }
}
