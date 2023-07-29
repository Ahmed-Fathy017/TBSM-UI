import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminDashboardCard } from '../../models/admin-dashboard-card';
import { DashboardsService } from '../../remote-services/dashboards.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  pageTitle: string = 'الرئيسية';

  cards: AdminDashboardCard[] = [];

  isLoading: boolean = false;

  constructor(private toastr: ToastrService,
    private dashboardsService: DashboardsService) { }

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
        this.setupViewData(response.data);
        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  setupViewData(data: any) {
    this.cards.push(data.roles_count);
    this.cards.push(data.warehouses_count);
    this.cards.push(data.categories_count);
    this.cards.push(data.users_count);
    this.cards.push(data.refrigerators_count);
    this.cards.push(data.orders_count);
  }

}
