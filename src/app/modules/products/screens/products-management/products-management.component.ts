import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/modules/packages/models/package';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';
import { ProductsService } from '../../remote-services/products.service';
import { Department } from 'src/app/modules/departments/models/department';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'ProductsManagmentScreen.PrimaryTitle';
  coloredPageTitle: string = 'ProductsManagmentScreen.ColoredPrimaryTitle'
  secondPageTitle: string = '';

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;


  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  pageSize: number = 3;

  searchProductForm = new FormGroup({
    filter: new FormControl(''),
    value: new FormControl('')
  });

  productsList: Department[] = [];
  selectedProduct: Product = new Product();


  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageChange(id: number, pageNumber: number) {
    let selectedItem = this.productsList.find(i => i.id == id);

    if (selectedItem) {
      selectedItem.selectedPage = pageNumber;

      let startIndex = (pageNumber - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      selectedItem.paginatedProducts = selectedItem.products.slice(startIndex, endIndex);
      console.log(selectedItem.paginatedProducts)
    }
  }

  onNextPageClick(id: number) {
    let selectedItem = this.productsList.find(i => i.id == id);

    if (selectedItem) {
      let nextPageNumber = selectedItem.selectedPage + 1;
      if (nextPageNumber <= selectedItem.pagesCount)
        this.onPageChange(id, nextPageNumber)
    }
  }

  onPreviousPageClick(id: number) {
    let selectedItem = this.productsList.find(i => i.id == id);

    if (selectedItem) {
      let previousPageNumber = selectedItem.selectedPage - 1;
      if (previousPageNumber >= selectedItem.minPage)
        this.onPageChange(id, previousPageNumber)
    }
  }

  onUpdateButtonClick(departmentId: number, productId: number) {
    let selectedDepartment = this.productsList.find(i => i.id == departmentId);
    if (selectedDepartment)
      this.selectedProduct = selectedDepartment.products.find(i => i.id == productId)!;
  }

  onDeleteButtonClick(departmentId: number, productId: number) {
    let selectedDepartment = this.productsList.find(i => i.id == departmentId);
    if (selectedDepartment)
      this.selectedProduct = selectedDepartment.products.find(i => i.id == productId)!;
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deleteProduct();
  }


  // funtions
  getProducts() {
    let subscription = this.productsService.getProducts().subscribe(
      (response: any) => {
        console.log(response)

        this.productsList = response.data;

        this.setupProductsList();

        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  setupProductsList(outdatedProductsList: Department[] = []) {
    // index is used to give ui ids
    let index = 0;

    this.productsList.map(i => {
      let existingItem = outdatedProductsList.find(j => j.id == i.id);

      if (!existingItem) {
        i.id = index + 1;
        index++;

        i.pagesCount = Math.ceil(i.products.length / this.pageSize);
        i.pages = Array.from({ length: i.pagesCount }, (_, index) => index + 1);
        i.selectedPage = 1;
        i.minPage = 1;

      } else {
        i.id = index + 1;
        index++;

        i.pagesCount = existingItem.pagesCount;
        i.pages = Array.from({ length: i.pagesCount }, (_, index) => index + 1);
        i.selectedPage = existingItem.selectedPage;
        i.minPage = existingItem.minPage;
      }

      this.onPageChange(i.id, i.selectedPage);
    });
  }

  deleteProduct() {
    let subscription = this.productsService.deleteProduct(this.selectedProduct.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let outdatedProductsList = this.productsList;
        this.productsList = response.data;

        this.setupProductsList(outdatedProductsList);

        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }
}
