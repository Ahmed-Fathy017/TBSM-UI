import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehousesService } from '../../remote-services/warehouses.service';
import { Warehouse } from '../../models/warehouse';
import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';
import { WarehouseDataCard } from '../../models/warehouse-data-card';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

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

  permissions: string[] = [];

  hasProductsAlmostExpiredViewAuthority: boolean = true;
  hasProductsExpiredViewAuthority: boolean = true;
  hasProductsEmptyQuantityViewAuthority: boolean = true;
  hasProductsLittleQuantityViewAuthority: boolean = true;
  hasProductsVariableTemperatureViewAuthority: boolean = true;

  productsAlmostExpiredViewAuthorityPermission: string = 'Main page.expiration_date_about_expired';
  productsExpiredViewAuthorityPermission: string = 'Main page.expiration_date_expired';
  productsEmptyQuantityViewAuthorityPermission: string = 'Main page.products_quantity_empty';
  productsLittleQuantityViewAuthorityPermission: string = 'Main page.products_quantity_little';
  productsVariableTemperatureViewAuthorityPermission: string = 'Main page.variable_temperature';

  constructor(
    private warehousesService: WarehousesService,
    private route: ActivatedRoute,
    private toastr: ToasterService,
    private localService: LocalService,
    private router: Router,
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private translateService: TranslateService) {
    super(translateService);
    this.evaluateScreenPermissions();
  }

  ngOnInit(): void {

    if (this.localService.getData('type') === UserTypes.ADMIN) {
      if (this.route.snapshot.paramMap.get('warehouseName'))
        this.localService.saveData('warehouseName', this.route.snapshot.paramMap.get('warehouseName')!);
      this.screenTitleNavigationService.setScreenKey('SelectedWarehouse');
    }
    else
      this.screenTitleNavigationService.setScreenKey('UserDashboard');

    this.warehouseId = parseInt(this.route.snapshot.paramMap.get('id')!);


    this.getWarehouse();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCardClick(filter: string) {
    this.router.navigate([`products/${filter}`]);
  }

  // functions
  evaluateScreenPermissions() {
    this.permissions = JSON.parse(this.localService.getData("permissions"));
    if (this.localService.getData('type') != UserTypes.ADMIN) {
      this.hasProductsAlmostExpiredViewAuthority = this.permissions.findIndex(i => i === this.productsAlmostExpiredViewAuthorityPermission) != -1 ? true : false;
      this.hasProductsExpiredViewAuthority = this.permissions.findIndex(i => i === this.productsExpiredViewAuthorityPermission) != -1 ? true : false;
      this.hasProductsEmptyQuantityViewAuthority = this.permissions.findIndex(i => i === this.productsEmptyQuantityViewAuthorityPermission) != -1 ? true : false;
      this.hasProductsLittleQuantityViewAuthority = this.permissions.findIndex(i => i === this.productsLittleQuantityViewAuthorityPermission) != -1 ? true : false;
      this.hasProductsVariableTemperatureViewAuthority = this.permissions.findIndex(i => i === this.productsVariableTemperatureViewAuthorityPermission) != -1 ? true : false;
    }
  }

  getWarehouse() {

    this.isLoadingWarehouseData = true;

    let subscription = this.warehousesService.getWarehouse().subscribe(
      (response: any) => {
        this.cards = response.data;
        this.logs = response.events;

        this.setupScreenView();
        this.isLoadingWarehouseData = false;
      }, (error: any) => {
        this.isLoadingWarehouseData = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
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
        i.iconUrl = 'http://54.38.85.127/tbsm/assets/images/dashboard/package.svg';
        i.visibility = this.hasProductsEmptyQuantityViewAuthority ? 'visible' : 'invisible';
        i.filter = 'empty-quantity';
      }
      else if (i.title == 'products_quantity_little') {
        i.backgroundColor = '#FFA629';
        i.iconClass = 'fa-solid fa-box';
        i.iconUrl = 'http://54.38.85.127/tbsm/assets/images/dashboard/package.svg';
        i.visibility = this.hasProductsLittleQuantityViewAuthority ? 'visible' : 'invisible';
        i.filter = 'little-quantity';
      }
      else if (i.title == 'variable_temperature') {
        i.backgroundColor = '#F15A60';
        i.iconClass = 'fa-solid fa-temperature-three-quarters';
        i.iconUrl = 'http://54.38.85.127/tbsm/assets/images/dashboard/temperature.svg';
        i.visibility = this.hasProductsVariableTemperatureViewAuthority ? 'visible' : 'invisible';
        i.filter = 'variable-temperature';
      }
      else if (i.title == 'expiration_date_expired') {
        i.backgroundColor = '#0D99FF';
        i.iconClass = 'fa-solid fa-calendar-days';
        i.iconUrl = 'http://54.38.85.127/tbsm/assets/images/dashboard/date.svg';
        i.visibility = this.hasProductsExpiredViewAuthority ? 'visible' : 'invisible';
        i.filter = 'expired-date';
      }
      else if (i.title == 'expiration_date_about_expired') {
        i.backgroundColor = '#FFA629';
        i.iconClass = 'fa-solid fa-calendar-days';
        i.iconUrl = 'http://54.38.85.127/tbsm/assets/images/dashboard/date.svg';
        i.visibility = this.hasProductsAlmostExpiredViewAuthority ? 'visible' : 'invisible';
        i.filter = 'almost-expired-date';
      }

    });
  }

}
