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
  width = 2;
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


  constructor(private localService: LocalService,
    private renderer: Renderer2) {
    this.productInfo = JSON.parse(this.localService.getData('productInfo'));

    if (this.productInfo) {
      this.productInfo.expiration_date = this.productInfo.expiration_date ?? 'none';
      this.productInfo.productNameDepartment = `${this.productInfo.name} - ${this.productInfo.category}`;

    }
  }

  ngOnInit(): void {
    this.renderer.listen('window', 'load', () => {
      // window.print();

      this.printBarcode(this.productInfo?.number);
    });
  }

  printBarcode = async (serial: any) => {
    try {

      // Create a new instance of the object
      const browserPrint = new ZebraBrowserPrintWrapper();

      // Select default printer
      const defaultPrinter = await browserPrint.getDefaultPrinter();

      // Set the printer
      browserPrint.setPrinter(defaultPrinter);

      // Check printer status
      const printerStatus = await browserPrint.checkPrinterStatus();

      // Check if the printer is ready
      if (printerStatus.isReadyToPrint) {

        // ZPL script to print a simple barcode
        const zpl = `^XA

        ^FX Top section with logo, name and address.
        ^CF0,60
        ^FO220,50^FD$TBSM-${this.productInfo?.warehouse!}}^FS
        ^CF0,30
        
        ^FX Secondsection with bar code.
        ^BY5,2,270
        ^FO100,120^BC^FD${this.productInfo?.number}^FS
        
        ^CF0,40
        ^FO30,470^FDReceive: ${this.productInfo?.print_date!} (${this.productInfo?.print_time!}}^FS
        ^CF0,30
        
        ^CF0,40
        ^FO30,520^FD${this.productInfo?.productNameDepartment}^FS
        ^CF0,30
        
        ^CF0,40
        ^FO30,570^FDExpiry: ${this.productInfo?.expiration_date}^FS
        ^CF0,30
        
        ^XZ`;

        browserPrint.print(zpl);
      } else {
        console.log("Error/s", printerStatus.errors);
      }

    } catch (error: any) {
      throw new Error(error);
    }
  };

  ngOnDestroy(): void {
    this.localService.removeData('productInfo');
  }

  onClick() {
    window.print();
  }

}
