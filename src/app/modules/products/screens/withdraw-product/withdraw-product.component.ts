import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/departments/models/department';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { Refrigerator } from 'src/app/modules/refrigerators/models/refrigerator';
import { RefrigeratorsService } from 'src/app/modules/refrigerators/remote-services/refrigerators.service';
import { SupplyChainsService } from 'src/app/modules/supply-chains/remote-services/supply-chains.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../remote-services/products.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { Html5QrcodeScanType, Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';

@Component({
  selector: 'app-withdraw-product',
  templateUrl: './withdraw-product.component.html',
  styleUrls: ['./withdraw-product.component.css']
})
export class WithdrawProductComponent extends SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'ProductWihdrawalScreen.PrimaryTitle';
  coloredPageTitle: string = 'ProductWihdrawalScreen.ColoredPrimaryTitle'
  secondPageTitle: string = '';

  html5QrcodeScanner!: Html5QrcodeScanner;
  scannedCode!: string;

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
    private toastr: ToasterService,
    private productsService: ProductsService,
    private translateService: TranslateService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('WithdrawProduct');

  }



  // events
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], aspectRatio: 2.2 },
      /* verbose= */ false);

    this.html5QrcodeScanner.render(this.onScanSuccess, undefined);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onScanSuccess = (decodedText: any, decodedResult: any) => {
    // handle the scanned code as you like, for example:

    if (decodedResult.decodedText != this.scannedCode) {
      this.scannedCode = decodedResult.decodedText;
      this.withdrawProductForm.controls.number.setValue(this.scannedCode);
    }
  }

  // onScanFailure(error: any) {
  //   // handle scan failure, usually better to ignore and keep scanning.
  //   // for example:
  //   // console.warn(`Code scan error = ${error}`);
  // }

  onWihdrawButtonClick() {
    Object.keys(this.withdrawProductForm.controls).forEach(field => {  
      const control = this.withdrawProductForm.get(field);            
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } 
    });

    if (this.withdrawProductForm.valid) {
      let productNumber = this.withdrawProductForm.controls.number.value!;
      this.isProcessing = true;
      let quanitity = this.products.filter(i => i.number == productNumber)?.length;
      this.getProdcuctByNumber(productNumber, quanitity);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);

  }

  onSaveButtonClick() {
    this.isProcessing = true;
    this.withdrawProduct(this.returnProductsWithdrawalRequestDTO());
  }

  // functions



  getProdcuctByNumber(productNumber: string, quanitity: number) {
    let subscription = this.productsService.getProdcuctByNumber(productNumber, quanitity).subscribe(
      (response: any) => {
        this.products.push(response.data)
        this.isProcessing = false;
      },
      (error: any) => {
        this.isProcessing = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
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


    return Object.fromEntries(map);
  }

  withdrawProduct(requestDTO: Object) {
    let subscribtion = this.productsService.withdrawProduct(requestDTO).subscribe(
      (response: any) => {
        this.isProcessing = false;
        this.toastr.success(response.message,this.successWithdrawOperationHeader);
        this.products = [];
      }, (error: any) => {
        this.isProcessing = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscribtion);
  }
}
