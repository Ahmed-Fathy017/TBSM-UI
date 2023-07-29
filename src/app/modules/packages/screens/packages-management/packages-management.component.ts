import { Component, OnDestroy, OnInit } from '@angular/core';
import { Package } from '../../models/package';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../remote-services/packages.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-packages-management',
  templateUrl: './packages-management.component.html',
  styleUrls: ['./packages-management.component.css']
})
export class PackagesManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'الرئيسية  /  الباقات /';
  coloredPageTitle: string = 'انشاء باقه'
  secondPageTitle: string = 'جميع الباقات';

  packages: Package[] = [];

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  constructor(
    private toastr: ToastrService,
    private packagesService: PackagesService) { }


  ngOnInit(): void {
    this.loadPackages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  loadPackages() {
    this.isLoading = true;
    let subscription = this.packagesService.getPackages().subscribe(
      (response: any) => {
        this.packages = response.data;
        this.isLoading = false;

      }, (error: any) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;

      }
    );

    this.subscription.add(subscription);
  }

}
