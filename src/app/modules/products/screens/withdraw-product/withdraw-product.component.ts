import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/departments/models/department';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { Refrigerator } from 'src/app/modules/refrigerators/models/refrigerator';
import { RefrigeratorsService } from 'src/app/modules/refrigerators/remote-services/refrigerators.service';
import { SupplyChainsService } from 'src/app/modules/supply-chains/remote-services/supply-chains.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../remote-services/products.service';

@Component({
  selector: 'app-withdraw-product',
  templateUrl: './withdraw-product.component.html',
  styleUrls: ['./withdraw-product.component.css']
})
export class WithdrawProductComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'ProductWihdrawalScreen.PrimaryTitle';
  coloredPageTitle: string = 'ProductWihdrawalScreen.ColoredPrimaryTitle'
  secondPageTitle: string = '';

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  withdrawProductForm = new FormGroup({
    number: new FormControl('', [Validators.required])
  });

  products: Product[] = [];


  // constructor
  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService) { }


  // events
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onWihdrawButtonClick() {
    if (this.withdrawProductForm.valid) {
      let productNumber = this.withdrawProductForm.controls.number.value!;
      this.isProcessing = true;
      this.getProdcuctByNumber(productNumber);
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');

  }

  onSaveButtonClick() {
    this.isProcessing = true;
    this.withdrawProduct(this.returnProductsWithdrawalRequestDTO());
  }

  // functions
  getProdcuctByNumber(productNumber: string) {
    let subscription = this.productsService.getProdcuctByNumber(productNumber, 1).subscribe(
      (response: any) => {
        console.log(response.data)
        this.products.push(response.data)
        this.isProcessing = false;
      },
      (error: any) => {
        this.isProcessing = false;
        console.log(error)
        this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  returnProductsWithdrawalRequestDTO(): Object {
    let map = new Map();

    this.products.forEach(i => {
      let keyValue = map.get(`${i.number}`);
      if (keyValue)
        map.set(`${i.number}`, keyValue + 1)
      else
        map.set(`${i.number}`, 1);
    });

    console.log(map)

    return Object.fromEntries(map);
  }

  withdrawProduct(requestDTO: Object) {
    let subscribtion = this.productsService.withdrawProduct(requestDTO).subscribe(
      (response: any) => {
        this.isProcessing = false;
        this.toastr.success(response.message);
        this.products = [];
      }, (error: any) => {
        this.isProcessing = false;
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }
}
