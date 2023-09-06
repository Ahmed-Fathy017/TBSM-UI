import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/departments/models/department';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { Refrigerator } from 'src/app/modules/refrigerators/models/refrigerator';
import { RefrigeratorsService } from 'src/app/modules/refrigerators/remote-services/refrigerators.service';
import { WarehousesService } from 'src/app/modules/warehouses/remote-services/warehouses.service';
import { Property } from '../../models/property';
import { Product } from '../../models/product';
import { ProductsService } from '../../remote-services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'CreateProductScreen.PrimaryTitle';
  coloredPageTitle: string = 'CreateProductScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'CreateProductScreen.SecondaryPageTitle';

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  @ViewChild('valueInput', { static: false }) valueInput!: ElementRef;
  @ViewChild('snackbar', { static: false }) snackbar!: ElementRef;

  departments: Department[] = [];
  refrigerators: Refrigerator[] = [];
  properties: Property[] = [];

  addedProperties: Property[] = [];
  selectedProperty: Property | null = null;

  createProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    refrigerator: new FormControl('', [Validators.required]),
    externalSupply: new FormControl(false),
    property: new FormControl(''),
  });

  createdProductId: number = 0;
  // productMessage: string = '';
  productRedirectLink: string = '';


  constructor(
    private toastr: ToastrService,
    private departmentsService: DepartmentsService,
    private refrigeratorsService: RefrigeratorsService,
    private warehouseService: WarehousesService,
    private productsService: ProductsService
  ) {


  }

  ngOnInit(): void {
    this.getDepartments();
    this.getRefrigerators();
    this.getWarehouseProperties();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPropetyOptionChange(event: any) {
    this.selectedProperty = this.properties.find(i => i.id == event.target.value)!;
  }

  onAddPropertyButtonClick() {
    // Access the element by its id
    let element = this.valueInput.nativeElement;

    let propertyExists = this.addedProperties.some(i => i.id == this.selectedProperty?.id)
    if (propertyExists) {
      this.toastr.warning('!تم اضافة هذه الخاصية', 'تحذير');
      return;
    }

    // Now, you can use element as a reference to the DOM element
    // For example, you can modify its properties or add event listeners
    if (element.value && this.selectedProperty) {
      let property = new Property();
      property.property_id = this.addedProperties.length + 1;
      property.id = property.property_id;
      property.type = this.selectedProperty.type;
      property.name = this.selectedProperty.name;
      property.value = element.value;

      this.addedProperties.push(property);

      element.textContent = '';

    }
    else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');

  }

  onRemovePropertyButtonClick(index: number) {
    this.addedProperties.splice(index, 1);

  }

  onProductSnackbarClick() {
    window.open(this.productRedirectLink, "_blank");
  }

  onCreateButtonClick() {

    if (this.createProductForm.valid) {
      let requestDTO = new Product();

      requestDTO.name = this.createProductForm.controls.name.value!;
      requestDTO.category_id = parseInt(this.createProductForm.controls.department.value!);
      requestDTO.quantity = parseInt(this.createProductForm.controls.quantity.value!);
      requestDTO.refrigerator_id = parseInt(this.createProductForm.controls.refrigerator.value!);
      requestDTO.chain_demand = this.createProductForm.controls.externalSupply.value == true ? 1 : 0;

      requestDTO.properties = this.addedProperties.length > 0 ? this.addedProperties : null;

      this.isProcessing = true;

      this.createProduct(requestDTO);
    }
    else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  getDepartments() {
    this.isLoading = true;

    let subscription = this.departmentsService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data;
        this.isLoading = false;
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
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  getWarehouseProperties() {
    let subscription = this.warehouseService.getWarehouseProperties().subscribe(
      (response: any) => {
        this.properties = response.data;
        this.selectedProperty = this.properties[0];
      }, (error) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }

  createProduct(requestDTO: Product) {
    let subscription = this.productsService.createProduct(requestDTO).subscribe(
      (response: any) => {

        this.createdProductId = response.data.id;
        // this.productMessage = 'طباعه الباركود';
        this.getProductInvoice();
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isProcessing = false;
      }
    );

    this.subscription.add(subscription);
  }

  getProductInvoice() {
    let subscribtion = this.productsService.getProductInvoice(this.createdProductId).subscribe(
      (response: any) => {
        this.productRedirectLink = response.data;
        this.showProductSnackbar();
        this.isProcessing = false;
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isProcessing = false;
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

}
