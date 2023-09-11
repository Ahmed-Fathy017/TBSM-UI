import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { SupplyChainsService } from 'src/app/modules/supply-chains/remote-services/supply-chains.service';
import { AddOrder } from 'src/app/modules/supply-chains/models/add-order';
import { PropertiesService } from 'src/app/modules/properties/remote-services/properties.service';
import { Property } from '../../models/property';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  subscription = new Subscription();

  firstPageTitle: string = 'ProductsManagmentScreen.PrimaryTitle';
  coloredPageTitle: string = 'ProductsManagmentScreen.ColoredPrimaryTitle'
  secondPageTitle: string = '';

  @ViewChild('editModal') editModal!: ElementRef;
  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;
  @ViewChild('supplyModalCloseButtonRef') supplyModalCloseButtonRef!: ElementRef;

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
  tempSelectedProduct: Product = new Product();
  selectedProductIndex: number = -1;

  departments: Department[] = [];
  refrigerators: Refrigerator[] = [];

  updateProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    refrigerator: new FormControl('', [Validators.required]),
    externalSupply: new FormControl(false)
  });

  supplyChainForm = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
  });


  properties: Property[] = [];
  requiredPropertiesIds: number[] = [];

  // constructor
  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService,
    private refrigeratorsService: RefrigeratorsService,
    private departmentsService: DepartmentsService,
    private supplyChainsService: SupplyChainsService,
    private propertiesService: PropertiesService,
    private renderer: Renderer2) { }


  // events
  ngOnInit(): void {
    this.getProducts();
    this.getDepartments();
    this.getRefrigerators();
    this.getProperties();

  }

  ngAfterViewInit() {
    this.setupModalCloseEventActions();
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



    // Object.assign(this.tempSelectedProduct, this.selectedProduct);
    this.tempSelectedProduct = JSON.parse(JSON.stringify(this.selectedProduct))
    console.log(this.tempSelectedProduct)

    this.fetchDataIntoUpdateModal();
  }

  onUpdateConfirmationClick() {
    console.log(this.requiredPropertiesIds)
    // let allRequiredPropertiesExist = this.selectedProduct.options.some(i => this.requiredPropertiesIds.every(j => j == i.property.id));
    // if (!allRequiredPropertiesExist){
    //   this.toastr.warning('لم يتم ادخال كل الخصائص المطلوبة!', 'تحذير');
    //   return;
    // }

    if (this.updateProductForm.valid) {
      this.isLoading = true;

      let requestDTO = new Product();

      requestDTO.id = this.selectedProduct!.id;
      requestDTO.name = this.updateProductForm.controls.name.value!;
      requestDTO.quantity = parseInt(this.updateProductForm.controls.quantity.value!);
      requestDTO.refrigerator_id = parseInt(this.updateProductForm.controls.refrigerator.value!);
      requestDTO.category_id = parseInt(this.updateProductForm.controls.department.value!);
      requestDTO.options = this.selectedProduct.options;
      requestDTO.properties = this.selectedProduct.properties;

      this.updateProduct(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onDeleteButtonClick(departmentId: number, productId: number, productIndex: number) {
    this.selectedDepartment = this.productsList.find(i => i.id == departmentId)!;
    if (this.selectedDepartment)
      this.selectedProduct = this.selectedDepartment.products.find(i => i.id == productId)!;

    this.selectedProductIndex = productIndex;
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deleteProduct();
  }

  onProductSupplyDemandButtonClick(departmentId: number, productId: number) {
    this.selectedDepartment = this.productsList.find(i => i.id == departmentId)!;
    if (this.selectedDepartment)
      this.selectedProduct = this.selectedDepartment.products.find(i => i.id == productId)!;
  }

  onProductSupplyDemandConfirmationClick() {
    if (this.supplyChainForm.valid) {
      let requestDTO = new AddOrder();
      requestDTO.product_id = this.selectedProduct.id;
      requestDTO.quantity = parseInt(this.supplyChainForm.controls.quantity.value!);
      this.addOrderRequest(requestDTO);
      this.supplyModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onProductBarcodeButtonClick(departmentId: number, productId: number) {
    this.selectedDepartment = this.productsList.find(i => i.id == departmentId)!;
    if (this.selectedDepartment)
      this.selectedProduct = this.selectedDepartment.products.find(i => i.id == productId)!;

    this.getProductInvoice();
  }

  onUpdateProperty(optionId: number, event: any) {
    let updatedProperty = this.selectedProduct.options?.find(i => i.id == optionId)!;
    updatedProperty.value = event.target.value;
  }

  onDeleteProperty(index: number) {
    this.selectedProduct.options.splice(index, 1);
  }

  // funtions
  getProducts() {
    let subscription = this.productsService.getProducts().subscribe(
      (response: any) => {

        this.productsList = response.data;
        this.setupProductsList();

        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  getProperties() {
    let subscribtion = this.propertiesService.getProperties().subscribe(
      (response: any) => {
        this.properties = response.data;
        this.requiredPropertiesIds = this.properties.filter(i => i.required_status).map(i => i.id);
        console.log(this.properties)
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscribtion);
  }

  getDepartments() {
    this.isLoading = true;

    let subscription = this.departmentsService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.error.errors[0].value, error.error.message);
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
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  setupProductsList() {
    // index is used to give ui ids
    let index = 0;

    this.productsList.map(i => {

      i.id = index + 1;
      index++;

      i.pagesCount = Math.ceil(i.products.length / this.pageSize);
      i.pages = Array.from({ length: i.pagesCount }, (_, index) => index + 1);
      i.selectedPage = i.lastSelectedPage ?? 1;
      i.minPage = 1;

      this.onPageChange(i.id, i.selectedPage);
    });
  }

  setupModalCloseEventActions() {
    const modalElement = this.editModal.nativeElement;
    this.renderer.listen(modalElement, 'hidden.bs.modal', () => {
      // This code will be executed when the modal is closed
      // Perform any actions you want when the modal is closed here
      Object.assign(this.selectedProduct, this.tempSelectedProduct);
    });
  }

  fetchDataIntoUpdateModal() {
    if (this.selectedProduct) {
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
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  deleteProduct() {
    let subscription = this.productsService.deleteProduct(this.selectedProduct.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        this.productsList.find(i => i.id = this.selectedDepartment.id)?.products.splice(this.selectedProductIndex, 1);
        this.productsList.map(i => i.lastSelectedPage = i.selectedPage);
        this.setupProductsList();

        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  getProductInvoice() {
    console.log(this.selectedProduct.id)
    let subscribtion = this.productsService.getProductInvoice(this.selectedProduct.id).subscribe(
      (response: any) => {
        window.open(response.data, "_blank");

      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  addOrderRequest(requestDTO: AddOrder) {
    let subscribtion = this.supplyChainsService.addOrderRequest(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }
}
