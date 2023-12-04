import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { Option } from '../../models/option'
import { GetProductsRequest } from '../../models/get-products-request';
import { ProductSearchItems } from '../../models/product-search-items';
import { ProductFilters } from '../../models/products-filter';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';
import { UserTypes } from 'src/app/modules/authentication/models/user-types';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 1, height: 0, overflow: 'hidden' }),
        animate('350ms', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('350ms', style({ opacity: 1, height: 0 })),
      ]),
    ])
  ]
})
export class ProductsManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy, AfterViewInit {

  subscription = new Subscription();

  firstPageTitle: string = 'ProductsManagmentScreen.PrimaryTitle';
  coloredPageTitle: string = 'ProductsManagmentScreen.ColoredPrimaryTitle'
  secondPageTitle: string = '';

  @ViewChild('editModal') editModal!: ElementRef;
  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;
  @ViewChild('supplyModalCloseButtonRef') supplyModalCloseButtonRef!: ElementRef;
  @ViewChild('valueInput', { static: false }) valueInput!: ElementRef;

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  pageSize: number = 3;

  searchProductForm = new FormGroup({
    filter: new FormControl(''),
    value: new FormControl('')
  });

  searchItems: { name: string, value: string }[] = [];
  productFilters = ProductFilters;
  filter: string = '';

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
  selectedProperty: Property = new Property();
  requiredPropertiesIds: number[] = [];

  permissions: string[] = [];

  isAdmin: boolean = true;

  hasProductDeletionAuthority: boolean = true;
  hasProductSupplyDemandingAuthority: boolean = true;
  hasProductIncreasingAuthority: boolean = true;
  hasProductBarcodePrintingAuthority: boolean = true;
  hasProductViewingAuthority: boolean = true;
  hasProductUpdatingAuthority: boolean = true;

  productDeletionAuthorityPermission: string = 'Products.delete';
  productSupplyDemandingAuthorityPermission: string = 'Products.demand_product';
  productIncreasingAuthorityPermission: string = 'Products.increase_product';
  productBarcodePrintingAuthorityPermission: string = 'Products.print_barcode';
  productViewingAuthorityPermission: string = 'Products.show_details';
  productUpdatingAuthorityPermission: string = 'Products.update';

  isEditMode: boolean = true;

  isRtl: boolean = false;

  noDataFound: boolean = false;

  createdProductId: string = '';
  productRedirectLink: string = '';
  successMessage: string = '';
  @ViewChild('snackbar', { static: false }) snackbar!: ElementRef;

  // constructor
  constructor(
    private toastr: ToasterService,
    private productsService: ProductsService,
    private refrigeratorsService: RefrigeratorsService,
    private departmentsService: DepartmentsService,
    private supplyChainsService: SupplyChainsService,
    private propertiesService: PropertiesService,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private localService: LocalService,
    private screenTitleNavigationService: ScreenTitleNavigationService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('ProductsManagement');

    this.isAdmin = this.localService.getData('type') === UserTypes.ADMIN;
    this.evaluateScreenPermissions();
    this.isRtl = this.localService.getData('lang') != 'en' ? true : false;
  }


  // events
  ngOnInit(): void {

    this.filter = this.productFilters.get(this.activatedRoute.snapshot.params.filter) ?? '';
    this.createdProductId = this.activatedRoute.snapshot.params.createdProductId ?? '';

    if (this.createdProductId)
      this.getProductInvoice(true);


    let requestDTO = new GetProductsRequest();
    requestDTO.product_filter = this.filter;

    this.getProducts(requestDTO);
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

  onSearchButtonClick() {
    let requestDTO = new GetProductsRequest();
    requestDTO.filter_type = this.searchProductForm.controls.filter.value!;
    requestDTO.filter_value = this.searchProductForm.controls.value.value!;
    requestDTO.product_filter = this.filter;

    this.isLoading = true;
    this.getProducts(requestDTO);
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

  onPropetyOptionChange(event: any) {
    this.selectedProperty = this.properties.find(i => i.id == event.target.value)!;
  }

  onAddPropertyButtonClick() {
    // Access the element by its id
    let element = this.valueInput.nativeElement;

    let propertyExists = this.selectedProduct.options?.some(i => i.property.id == this.selectedProperty?.id);
    if (propertyExists) {
      this.toastr.warning(this.invalidInputDuplicationMessage, this.invalidInputWarningHeader);
      return;
    }

    // Now, you can use element as a reference to the DOM element
    // For example, you can modify its properties or add event listeners
    if (element.value && this.selectedProperty) {
      if (!this.selectedProduct.options)
        this.selectedProduct.options = [];

      let option = new Option();
      option.id = this.selectedProduct.options.length + 1;
      // option.isNew = true;
      option.value = element.value;

      option.property = new Property();
      option.property.property_id = this.selectedProperty?.id;
      option.property.id = option.property.property_id;
      option.property.type = this.selectedProperty.type;
      option.property.name = this.selectedProperty.name;
      option.property.value = element.value;

      this.selectedProduct.options.push(option);

      element.textContent = '';
    }
    else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);

  }

  onUpdateButtonClick(departmentId: number, productId: number) {
    this.isEditMode = true;

    this.selectedDepartment = this.productsList.find(i => i.id == departmentId)!;
    if (this.selectedDepartment)
      this.selectedProduct = this.selectedDepartment.products.find(i => i.id == productId)!;

    console.log(this.selectedProduct)

    // deep cloning of latest snapshot of this.selectedProduct
    this.tempSelectedProduct = JSON.parse(JSON.stringify(this.selectedProduct))

    this.fetchDataIntoUpdateModal();
  }

  onUpdateConfirmationClick() {
    let allRequiredPropertiesExist = this.requiredPropertiesIds.every(i => this.selectedProduct.options.some(j => j.property.id == i))
    if (!allRequiredPropertiesExist) {
      this.toastr.warning(this.invalidInputCountMessage, this.invalidInputWarningHeader);
      return;
    }

    Object.keys(this.updateProductForm.controls).forEach(field => {
      const control = this.updateProductForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if (this.updateProductForm.valid) {
      this.isLoading = true;

      let requestDTO = new Product();

      requestDTO.id = this.selectedProduct!.id;
      requestDTO.name = this.updateProductForm.controls.name.value!;
      requestDTO.quantity = parseInt(this.updateProductForm.controls.quantity.value!);
      requestDTO.refrigerator_id = parseInt(this.updateProductForm.controls.refrigerator.value!);
      requestDTO.category_id = parseInt(this.updateProductForm.controls.department.value!);
      requestDTO.options = this.selectedProduct.options;
      requestDTO.properties = this.selectedProduct.options.map(i => i.property);
      requestDTO.chain_demand = this.updateProductForm.controls.externalSupply.value ? 1 : 0;

      this.updateProduct(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
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

    Object.keys(this.supplyChainForm.controls).forEach(field => {
      const control = this.supplyChainForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if (this.supplyChainForm.valid) {
      let requestDTO = new AddOrder();
      requestDTO.product_id = this.selectedProduct.id;
      requestDTO.quantity = parseInt(this.supplyChainForm.controls.quantity.value!);
      this.addOrderRequest(requestDTO);
      this.supplyModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
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

  onViewProductButtonClick(departmentId: number, productId: number) {
    this.isEditMode = false;

    this.selectedDepartment = this.productsList.find(i => i.id == departmentId)!;
    if (this.selectedDepartment)
      this.selectedProduct = this.selectedDepartment.products.find(i => i.id == productId)!;

    // deep cloning of latest snapshot of this.selectedProduct
    this.tempSelectedProduct = JSON.parse(JSON.stringify(this.selectedProduct))

    this.fetchDataIntoUpdateModal();
  }

  onProductPrintClick() {
    window.open('product/print', "_blank", 'noreferrer');
  }

  onCloseSnackbarButtonClick() {
    this.snackbar.nativeElement.classList.remove("show");
  }

  // funtions

  evaluateScreenPermissions() {
    this.permissions = JSON.parse(this.localService.getData("permissions"));

    this.hasProductViewingAuthority = this.permissions.findIndex(i => i === this.productViewingAuthorityPermission) != -1 ? true : false;
    this.hasProductDeletionAuthority = this.permissions.findIndex(i => i === this.productDeletionAuthorityPermission) != -1 ? true : false;
    this.hasProductUpdatingAuthority = this.permissions.findIndex(i => i === this.productUpdatingAuthorityPermission) != -1 ? true : false;
    this.hasProductBarcodePrintingAuthority = this.permissions.findIndex(i => i === this.productBarcodePrintingAuthorityPermission) != -1 ? true : false;
    this.hasProductSupplyDemandingAuthority = this.permissions.findIndex(i => i === this.productSupplyDemandingAuthorityPermission) != -1 ? true : false;
    this.hasProductIncreasingAuthority = this.permissions.findIndex(i => i === this.productIncreasingAuthorityPermission) != -1 ? true : false;
  }

  getProducts(requestDTO: GetProductsRequest) {
    let subscription = this.productsService.getProducts(requestDTO).subscribe(
      (response: any) => {

        this.productsList = response.data;
        this.noDataFound = this.productsList.every(i => i.products.length == 0);
        this.setupProductsList();

        this.isLoading = false;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }



  getProperties() {
    let subscribtion = this.propertiesService.getProperties().subscribe(
      (response: any) => {
        this.properties = response.data;

        let filteredProperties = this.properties.filter(i => i.required_status);
        this.requiredPropertiesIds = filteredProperties.map(i => i.id);


        // adding name search item
        this.searchItems.push({
          name: 'ProductsManagmentScreen.NameSearch',
          value: 'name'
        });

        // adding required properties to the search items array
        filteredProperties.map((property) => {
          this.searchItems.push({
            name: property.name,
            value: 'properities'
          })
        });

        // adding other search item
        this.searchItems.push({
          name: 'ProductsManagmentScreen.OtherSearch',
          value: 'other'
        });

        this.selectedProperty = this.properties[0];
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
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
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
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
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  setupProductsList() {
    // index is used to give ui ids
    let index = 0;

    this.productsList.map(i => {

      // setup properties of products so on sending requests the values
      // will be in the right format (as updating requires object with property_id, value)
      // which are not supplied on retrieving the data initially, so I have to set them manually
      i.products.map(i => {
        i.options.map(i => {
          i.property.property_id = i.property.id;
          i.property.value = i.value
        })
      });

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
      this.updateProductForm.controls.externalSupply.setValue(Boolean(this.selectedProduct.chain_demand));
    }

    if (this.isEditMode)
      this.updateProductForm.enable();
    else
      this.updateProductForm.disable();
  }

  updateProduct(requestDTO: Product) {
    let subscribtion = this.productsService.updateProduct(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successEditOperationHeader);

        let updatedProduct = this.selectedDepartment.products.find(i => i.id == requestDTO.id)!;
        Object.assign(updatedProduct!, response.data);

        // setup options/properties objects of the product
        // to be in the suitable formats for the upcoming update requests
        updatedProduct.options.map(i => {
          i.property.property_id = i.property.id;
          i.property.value = i.value
        });

        this.onPageChange(this.selectedDepartment.id, this.selectedDepartment.selectedPage);

        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
      }
    );

    this.subscription.add(subscribtion);
  }

  deleteProduct() {
    let subscription = this.productsService.deleteProduct(this.selectedProduct.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successDeleteOperationHeader);

        this.productsList.find(i => i.id = this.selectedDepartment.id)?.products.splice(this.selectedProductIndex, 1);
        this.productsList.map(i => i.lastSelectedPage = i.selectedPage);
        this.setupProductsList();

        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }

  getProductInvoice(isNewlyCreatedProduct: boolean = false) {
    let productId = isNewlyCreatedProduct ? parseInt(this.createdProductId) : this.selectedProduct.id;
    let subscribtion = this.productsService.getProductInvoice(productId).subscribe(
      (response: any) => {

        this.productRedirectLink = response.data;

        this.localService.saveData('productInfo', JSON.stringify(response.data));

        if (!isNewlyCreatedProduct)
          this.onProductPrintClick();
        else
          this.showProductSnackbar();

      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
      }
    );

    this.subscription.add(subscribtion);
  }

  showProductSnackbar() {
    // Add the 'show' class to display the snackbar
    this.snackbar.nativeElement.classList.add("show");

    // After 3 seconds (3000 milliseconds), remove the 'show' class to hide the snackbar
    setTimeout(() => {
      this.snackbar.nativeElement.classList.remove("show");
    }, 3000); // Adjust the duration as needed (3 seconds in this example)
  }

  addOrderRequest(requestDTO: AddOrder) {
    let subscribtion = this.supplyChainsService.addOrderRequest(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successCreateOperationHeader);
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
      }
    );

    this.subscription.add(subscribtion);
  }
}
