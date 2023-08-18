import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehousesService } from '../../remote-services/warehouses.service';
import { Warehouse } from '../../models/warehouse';
import { ActivatedRoute } from '@angular/router';
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

  // = [
  //   { count: 10, title: 'منتجات نفذ كميتها', backgroundColor: '#0D99FF', iconClass: 'fa-solid fa-box', visibility: 'visible' },
  //   { count: 1, title: 'منتجات كميتها قليله', backgroundColor: '#FFA629', iconClass: 'fa-solid fa-box', visibility: 'visible' },
  //   { count: 12, title: 'درجه حراره متغيره', backgroundColor: '#F15A60', iconClass: 'fa-solid fa-temperature-three-quarters', visibility: 'visible' },
  //   { count: 0, title: 'تاريخ صلاحيه منتهي', backgroundColor: '#0D99FF', iconClass: 'fa-solid fa-calendar-days', visibility: 'visible' },
  //   { count: 0, title: 'تاريخ صلاحيه شارف علي الانتهاء', backgroundColor: '#FFA629', iconClass: 'fa-solid fa-calendar-days', visibility: 'visible' },
  //   { count: 0, title: 'تاريخ صلاحيه شارف علي الانتهاء', backgroundColor: '#FFA629', iconClass: 'fa-solid fa-calendar-days', visibility: 'invisible' },

  // ];

  logs: string[] = [
    'قام احمد بسحب المنتج شيبس عدد 5 بتاريخ 2/7/2023',
    'قام خالد بادخال منتج جديد بأسم حاويات عدد 1 بتاريخ 1/7/2023',
    'قام خالد بالموافقة على طلب سلاسل امداد خارجية من المستودع الطائر بمنتج شيبس عدد 1',
    'قام المستودع الطائر بطلب سلاسل امداد خارجية منتج شيبس عدد 1'
  ]

  constructor(
    private warehousesService: WarehousesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private localService: LocalService) { }



  ngOnInit(): void {
    this.warehouseId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getWarehouse();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getWarehouse() {

    this.isLoadingWarehouseData = true;
    let isAdmin: boolean = this.localService.getData('type') === UserTypes.ADMIN;

    let subscription = this.warehousesService.getWarehouse(isAdmin? this.warehouseId : undefined).subscribe(
      (response: any) => {
        console.log(response)
        this.cards = response.data;
        
        this.setupScreenView();
        this.isLoadingWarehouseData = false;
      }, (error: any) => {
        this.isLoadingWarehouseData = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  setupScreenView() {
    let dummyCard = <WarehouseDataCard>{};
    dummyCard.title = 'dummy';
    dummyCard.visibility = 'invisible';

    this.cards.push(dummyCard)
    this.cards.map(i => {
      if (i.title == 'products_quantity_empty') {
        i.backgroundColor = '#0D99FF';
        i.iconClass = 'fa-solid fa-box';
        i.visibility = 'visible';

      }
      else if (i.title == 'products_quantity_little'){
        i.backgroundColor = '#FFA629';
        i.iconClass = 'fa-solid fa-box';
        i.visibility = 'visible';

      }
      else if (i.title == 'variable_temperature'){
        i.backgroundColor = '#F15A60';
        i.iconClass = 'fa-solid fa-temperature-three-quarters';
        i.visibility = 'visible';

      }
      else if (i.title == 'expiration_date_expired'){
        i.backgroundColor = '#0D99FF';
        i.iconClass = 'fa-solid fa-calendar-days';
        i.visibility = 'visible';

      }
      else if (i.title == 'expiration_date_about_expired'){
        i.backgroundColor = '#FFA629';
        i.iconClass = 'fa-solid fa-calendar-days';
        i.visibility = 'visible';

      }

    });
  }

}
