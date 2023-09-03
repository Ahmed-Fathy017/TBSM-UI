import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/modules/packages/models/package';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';
import { ProductsService } from '../../remote-services/products.service';
import { Department } from 'src/app/modules/departments/models/department';
import { Product } from '../../models/product';
import { RefrigeratorsService } from 'src/app/modules/refrigerators/remote-services/refrigerators.service';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { Refrigerator } from 'src/app/modules/refrigerators/models/refrigerator';

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
  selectedDepartment: Department = new Department();
  selectedProduct: Product = new Product();

  departments: Department[] = [];
  refrigerators: Refrigerator[] = [];

  updateProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    refrigerator: new FormControl('', [Validators.required]),
    externalSupply: new FormControl(false),
    number: new FormControl(''),
  });

  // constructor
  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService,
    private refrigeratorsService: RefrigeratorsService,
    private departmentsService: DepartmentsService) { }


  // events
  ngOnInit(): void {
    this.getProducts();
    this.getDepartments();
    this.getRefrigerators();
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
      // console.log(selectedItem.paginatedProducts)
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
    this.selectedDepartment = this.productsList.find(i => i.id == departmentId)!;
    if (this.selectedDepartment)
      this.selectedProduct = this.selectedDepartment.products.find(i => i.id == productId)!;

    this.fetchDataIntoUpdateModal();
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

  onUpdateConfirmationClick() {
    if (this.updateProductForm.valid) {
      this.isLoading = true;

      let requestDTO = new Product();

      requestDTO.id = this.selectedProduct!.id;
      requestDTO.name = this.updateProductForm.controls.name.value!;
      requestDTO.quantity = parseInt(this.updateProductForm.controls.quantity.value!);
      requestDTO.refrigerator_id = parseInt(this.updateProductForm.controls.refrigerator.value!);
      requestDTO.category_id = parseInt(this.updateProductForm.controls.department.value!);

      this.updateProduct(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
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

  getDepartments() {
    this.isLoading = true;

    let subscription = this.departmentsService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data;
        this.isLoading = false;
        console.log(this.departments)
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  getRefrigerators() {
    this.isLoading = true;
    let subscription = this.refrigeratorsService.getRefrigerators().subscribe(
      (response: any) => {
        this.refrigerators = response.data;
        this.isLoading = false;
        this.isProcessing = false;
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

  fetchDataIntoUpdateModal() {
    console.log(this.selectedProduct)
    if (this.selectedProduct) {
      // this.selectedWarehouse.package_id = this.selectedWarehouse.package.id;
      this.updateProductForm.controls.name.setValue(this.selectedProduct.name);
      this.updateProductForm.controls.quantity.setValue(String(this.selectedProduct.quantity));
      this.updateProductForm.controls.refrigerator.setValue(String(this.selectedProduct.refrigerator.id));
      this.updateProductForm.controls.department.setValue(String(this.selectedProduct.category.id));

    }
  }

  updateProduct(requestDTO: Product) {
    let subscribtion = this.productsService.updateProduct(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let updatedProduct = this.selectedDepartment.products.find(i => i.id == requestDTO.id);
        Object.assign(updatedProduct!, response.data);
        this.onPageChange(this.selectedDepartment.id, this.selectedDepartment.selectedPage);

        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
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
