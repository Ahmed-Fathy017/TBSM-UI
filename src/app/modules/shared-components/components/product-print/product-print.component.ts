import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { ProductInfo } from 'src/app/modules/products/models/product-info';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';

@Component({
  selector: 'app-product-print',
  templateUrl: './product-print.component.html',
  styleUrls: ['./product-print.component.css']
})
export class ProductPrintComponent implements OnInit, OnDestroy {
  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');

  lineColor = '#000000';
  width = 3;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  productInfo: ProductInfo | null = null;

  browserPrint!: ZebraBrowserPrintWrapper;


  constructor(private localService: LocalService,
    private renderer: Renderer2) {
    this.productInfo = JSON.parse(this.localService.getData('productInfo'));

    if (this.productInfo) {
      this.productInfo.warehouse = this.productInfo.warehouse?.toUpperCase();
      this.productInfo.expiration_date = this.productInfo.expiration_date ?? 'none';
      this.productInfo.productNameDepartment = `${this.productInfo.name} - ${this.productInfo.category}`;

    }
  }

  ngOnInit(): void {
    this.setup();
  }

  private setup() {
    this.browserPrint = new ZebraBrowserPrintWrapper();
    // Create a new instance of the object

    // Select default printer
    let defaultPrinter = this.browserPrint.getDefaultPrinter();

    console.log(defaultPrinter);
    defaultPrinter.then(device => {

      console.log("default browser setup done");
      this.browserPrint.setPrinter(device);
      this.printJob();

    });
  }

  async printJob() {

    // Code 128 format
    const zpl = `
    ^XA^CI27^FO160,40^BY3^BC,90,N,N,N^FD>;${this.productInfo?.number}
    ^FS^FO90,150^CF0,18^FD ID:${this.productInfo?.number} / Receive: ${this.productInfo?.print_date!} (${this.productInfo?.print_time!}) 
    ^FS^FO90,170^CF0,18^FD ${this.productInfo?.productNameDepartment}
    ^FS^FO90,190^CF0,18^FD Expiry Date : ${this.productInfo?.expiration_date} 
    ^FS^CF0,18^FO200,10^FD TBSM - ${this.productInfo?.warehouse!} ^FS^XZ`;


    // const zpl = `
    // ^XA^CI27^FO160,40^BY3^BCN,90,N,N^FD>;${this.productInfo?.number}
    // ^FS^FO90,150^CF0,18^FD ID:${this.productInfo?.number} / Receive: ${this.productInfo?.print_date!} (${this.productInfo?.print_time!}) 
    // ^FS^FO90,170^CF0,18^FD ${this.productInfo?.productNameDepartment}
    // ^FS^FO90,190^CF0,18^FD Expiry Date : ${this.productInfo?.expiration_date} 
    // ^FS^CF0,18^FO200,10^FD TBSM - ${this.productInfo?.warehouse!} ^FS^XZ`;

    this.browserPrint.print(zpl);
  }


  ngOnDestroy(): void {
    this.localService.removeData('productInfo');
  }

  onClick() {
    window.print();
  }

}
