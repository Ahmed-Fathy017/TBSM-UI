import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  isLoading: boolean = true;

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
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private renderer: Renderer2,
    private elementRef: ElementRef) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('WithdrawProduct');

  }



  // events
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {


    // styling scanner
    setTimeout(() => {

      this.html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], aspectRatio: 2.2 },
        /* verbose= */ false);

      this.html5QrcodeScanner.render(this.onScanSuccess, undefined);

      const cameraPermissionButton = this.elementRef.nativeElement.querySelector(`#html5-qrcode-button-camera-permission`);
      if (cameraPermissionButton) {
        this.renderer.removeAttribute(cameraPermissionButton, 'style');
        this.renderer.setStyle(cameraPermissionButton, 'background-color', '#F15A60');
        this.renderer.setStyle(cameraPermissionButton, 'color', 'white');
        this.renderer.setStyle(cameraPermissionButton, 'border-radius', '2rem');
        this.renderer.setStyle(cameraPermissionButton, 'border', 'none');
        this.renderer.setStyle(cameraPermissionButton, 'width', '15rem');
        this.renderer.setStyle(cameraPermissionButton, 'height', '2rem');
      }

      setTimeout(() => {
        const startCameraButton = this.elementRef.nativeElement.querySelector(`#html5-qrcode-button-camera-start`);
        const stopCameraButton = this.elementRef.nativeElement.querySelector(`#html5-qrcode-button-camera-stop`);

       

        if (startCameraButton) {
          this.renderer.removeAttribute(startCameraButton, 'style');
          this.renderer.setStyle(startCameraButton, 'background-color', '#F15A60');
          this.renderer.setStyle(startCameraButton, 'color', 'white');
          this.renderer.setStyle(startCameraButton, 'border-radius', '2rem');
          this.renderer.setStyle(startCameraButton, 'border', 'none');
          this.renderer.setStyle(startCameraButton, 'width', '10rem');
          this.renderer.setStyle(startCameraButton, 'height', '2rem');
        }

        if (stopCameraButton) {
          this.renderer.removeAttribute(stopCameraButton, 'style');
          this.renderer.setStyle(stopCameraButton, 'background-color', '#F15A60');
          this.renderer.setStyle(stopCameraButton, 'color', 'white');
          this.renderer.setStyle(stopCameraButton, 'border-radius', '2rem');
          this.renderer.setStyle(stopCameraButton, 'border', 'none');
          this.renderer.setStyle(stopCameraButton, 'width', '10rem');
          this.renderer.setStyle(stopCameraButton, 'height', '2rem');
        }

      }, 1500);
      this.isLoading = false;

    }, 1000);

  }

  ngOnDestroy(): void {
    this.closeScanCamera();
    this.subscription.unsubscribe();
  }

  onDeleteProduct(index: number) {
    this.products.splice(index, 1);
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

  closeScanCamera() {
    this.html5QrcodeScanner.clear().then(_ => {
      // the UI should be cleared here      
    }).catch(error => {
      // Could not stop scanning for reasons specified in `error`.
      // This conditions should ideally not happen.
    });
  }

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
      let quanitity = this.products.filter(i => i.number == productNumber)?.length + 1;
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
        let product = response.data as Product;
        product.UIId = this.products?.length + 1;

        this.products.push(product);
        this.isProcessing = false;
      },
      (error: any) => {
        this.isProcessing = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
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
        this.toastr.success(response.message, this.successWithdrawOperationHeader);
        this.products = [];
      }, (error: any) => {
        this.isProcessing = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
      }
    );

    this.subscription.add(subscribtion);
  }
}
