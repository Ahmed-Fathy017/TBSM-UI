import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { ProductInfo } from 'src/app/modules/products/models/product-info';

@Component({
  selector: 'app-product-print',
  templateUrl: './product-print.component.html',
  styleUrls: ['./product-print.component.css']
})
export class ProductPrintComponent implements OnInit, OnDestroy {
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
  }

  ngOnInit(): void {
    this.renderer.listen('window', 'load', () => {
      window.print();
    });
  }

  ngOnDestroy(): void {
    this.localService.removeData('productInfo');
  }

  onClick() {
    window.print();
  }

}
