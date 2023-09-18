import { Component } from '@angular/core';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-external-supply-requests-management',
  templateUrl: './external-supply-requests-management.component.html',
  styleUrls: ['./external-supply-requests-management.component.css']
})
export class ExternalSupplyRequestsManagementComponent {

  firstPageTitle: string = 'SupplyRequetsManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'SupplyRequetsManagementScreen.ExternalRequestsColoredPrimaryTitle';


  constructor(private screenTitleNavigationService: ScreenTitleNavigationService) {
    this.screenTitleNavigationService.setScreenKey('ExternalSupplyRequests');
    
  }
}
