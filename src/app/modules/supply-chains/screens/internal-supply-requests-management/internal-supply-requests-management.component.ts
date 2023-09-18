import { Component } from '@angular/core';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-internal-supply-requests-management',
  templateUrl: './internal-supply-requests-management.component.html',
  styleUrls: ['./internal-supply-requests-management.component.css']
})
export class InternalSupplyRequestsManagementComponent {

  firstPageTitle: string = 'SupplyRequetsManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'SupplyRequetsManagementScreen.InternalRequestsColoredPrimaryTitle';

  constructor(private screenTitleNavigationService: ScreenTitleNavigationService) {
    this.screenTitleNavigationService.setScreenKey('InternalSupplyRequests');
  }
}
