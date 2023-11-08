import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminDashboardCard } from '../../models/admin-dashboard-card';
import { DashboardsService } from '../../remote-services/dashboards.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';
import { NavbarService } from 'src/app/modules/master-layout/services/navbar.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  // pageTitle: string = 'الرئيسية';
  pageTitle: string = 'AdminDashboardScreen.Home';

  cards: AdminDashboardCard[] = [];

  isLoading: boolean = false;

  isAdmin: boolean = false;
  warehouseName: string = '';
  warehouseId: string = '';

  constructor(private toastr: ToasterService,
    private dashboardsService: DashboardsService,
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private translateService: TranslateService,
    private localService: LocalService,
    private navbarService: NavbarService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('AdminDashboard');

    // setting isAdmin flag based on the logged in user type
    this.isAdmin = this.localService.getData('type') == UserTypes.ADMIN;
  }

  ngOnInit(): void {
    if (this.isAdmin && !this.localService.getData('warehouseName') && !this.localService.getData('warehouseId')) {
      this.loadData();
    }

    if (this.isAdmin) {
      this.navbarService.getWarehouseMode().subscribe((state) => {
        this.warehouseName = state ? this.localService.getData('warehouseName') : '';
        this.warehouseId = state ? this.localService.getData('warehouseId') : '';
       
        if (!this.warehouseName && !this.warehouseId) {
          this.loadData();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.isLoading = true;

    let subscription = this.dashboardsService.getAdminDashboardData().subscribe(
      (response: any) => {
        this.cards = response.data;
        this.isLoading = false;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }
}
