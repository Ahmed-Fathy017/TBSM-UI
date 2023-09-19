import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminDashboardCard } from '../../models/admin-dashboard-card';
import { DashboardsService } from '../../remote-services/dashboards.service';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  // pageTitle: string = 'الرئيسية';
  pageTitle: string = 'AdminDashboardScreen.Home';

  cards: AdminDashboardCard[] = [];

  isLoading: boolean = false;

  constructor(private toastr: ToastrService,
    private dashboardsService: DashboardsService,
    private screenTitleNavigationService: ScreenTitleNavigationService) { 
      this.screenTitleNavigationService.setScreenKey('AdminDashboard');
    }

  ngOnInit(): void {
    this.loadData();
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
        if (error.error.errors && error.error.errors.length >0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }
}
