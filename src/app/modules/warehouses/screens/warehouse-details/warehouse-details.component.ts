import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehousesService } from '../../remote-services/warehouses.service';
import { Warehouse } from '../../models/warehouse';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';
import { WarehouseDataCard } from '../../models/warehouse-data-card';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  pageTitle: string = 'WarehouseDetailsScreen.PrimaryTitle';
  coloredPageTitle: string = 'WarehouseDetailsScreen.ColoredPrimaryTitle'

  warehouseId!: number;
  warehouse!: Warehouse;

  // page loading
  isLoadingWarehouseData: boolean = false;
  isLoadingWarehouseLogs: boolean = false;

  cards: WarehouseDataCard[] = [];

  logs: string[] = [];

  constructor(
    private warehousesService: WarehousesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private localService: LocalService,
    private router: Router) { }

  ngOnInit(): void {
    this.warehouseId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getWarehouse();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCardClick(filter: string) {
    this.router.navigate([`products/${filter}`]);
  }

  getWarehouse() {

    this.isLoadingWarehouseData = true;
    let isAdmin: boolean = this.localService.getData('type') === UserTypes.ADMIN;

    let subscription = this.warehousesService.getWarehouse(isAdmin? this.warehouseId : undefined).subscribe(
      (response: any) => {
        this.cards = response.data;
        this.logs = response.events;
        
        this.setupScreenView();
        this.isLoadingWarehouseData = false;
      }, (error: any) => {
        this.isLoadingWarehouseData = false;
        if (error.error.errors)
        this.toastr.error(error.error.errors[0].value, error.error.message);
      else
        this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  setupScreenView() {
    let dummyCard = <WarehouseDataCard>{};
    dummyCard.title = 'dummy';
    dummyCard.visibility = 'invisible';
    dummyCard.filter = '';

    this.cards.push(dummyCard)
    this.cards.map(i => {
      if (i.title == 'products_quantity_empty') {
        i.backgroundColor = '#0D99FF';
        i.iconClass = 'fa-solid fa-box';
        i.visibility = 'visible';
        i.filter = 'empty-quantity';
      }
      else if (i.title == 'products_quantity_little'){
        i.backgroundColor = '#FFA629';
        i.iconClass = 'fa-solid fa-box';
        i.visibility = 'visible';
        i.filter = 'little-quantity';
      }
      else if (i.title == 'variable_temperature'){
        i.backgroundColor = '#F15A60';
        i.iconClass = 'fa-solid fa-temperature-three-quarters';
        i.visibility = 'visible';
        i.filter = 'variable-temperature';
      }
      else if (i.title == 'expiration_date_expired'){
        i.backgroundColor = '#0D99FF';
        i.iconClass = 'fa-solid fa-calendar-days';
        i.visibility = 'visible';
        i.filter = 'expired-date';
      }
      else if (i.title == 'expiration_date_about_expired'){
        i.backgroundColor = '#FFA629';
        i.iconClass = 'fa-solid fa-calendar-days';
        i.visibility = 'visible';
        i.filter = 'almost-expired-date';
      }

    });
  }

}
