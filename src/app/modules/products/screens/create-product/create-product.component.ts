import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/departments/models/department';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { Refrigerator } from 'src/app/modules/refrigerators/models/refrigerator';
import { RefrigeratorsService } from 'src/app/modules/refrigerators/remote-services/refrigerators.service';
import { WarehousesService } from 'src/app/modules/warehouses/remote-services/warehouses.service';
import { Property } from '../../models/property';
import { Product } from '../../models/product';
import { ProductsService } from '../../remote-services/products.service';
import { PropertiesService } from 'src/app/modules/properties/remote-services/properties.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent extends SharedMessagesComponent implements OnInit, OnDestroy {
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

  requiredPropertiesIds: number[] = [];


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

  successMessage: string = '';

  isRtl: boolean = true;

  constructor(
    private toastr: ToasterService,
    private departmentsService: DepartmentsService,
    private refrigeratorsService: RefrigeratorsService,
    private warehouseService: WarehousesService,
    private productsService: ProductsService,
    private propertiesService: PropertiesService,
    private translateService: TranslateService,
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private localService: LocalService
  ) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('CreateProduct');
    this.isRtl = this.localService.getData('lang') != 'en' ? true : false;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDepartments();
    this.getRefrigerators();
    this.getProperties();
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
      this.toastr.warning(this.invalidInputDuplicationMessage, this.invalidInputWarningHeader);
      return;
    }

    // Now, you can use element as a reference to the DOM element
    // For example, you can modify its properties or add event listeners
    if (element.value && this.selectedProperty) {
      let property = new Property();
      property.property_id = this.selectedProperty?.id;
      property.id = property.property_id;
      property.type = this.selectedProperty.type;
      property.name = this.selectedProperty.name;
      property.value = element.value;

      this.addedProperties.push(property);

      element.textContent = '';

    }
    else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);

  }

  onRemovePropertyButtonClick(index: number) {
    this.addedProperties.splice(index, 1);

  }

  onProductSnackbarClick() {
    window.open(this.productRedirectLink, "_blank");
  }

  onCreateButtonClick() {

    let allRequiredPropertiesExist = this.addedProperties.some(i => this.requiredPropertiesIds.every(j => j == i.property_id));
    if (!allRequiredPropertiesExist && this.addedProperties?.length > 0) {
      this.toastr.warning(this.invalidInputCountMessage, this.invalidInputWarningHeader);
      // return;
    }

    Object.keys(this.createProductForm.controls).forEach(field => {  
      const control = this.createProductForm.get(field);            
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } 
    });

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
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onCloseSnackbarButtonClick() {
    this.snackbar.nativeElement.classList.remove("show");
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

  getProperties() {
    let subscription = this.propertiesService.getProperties().subscribe(
      (response: any) => {
        this.properties = response.data;
        this.requiredPropertiesIds = this.properties.filter(i => i.required_status).map(i => i.id);
        this.selectedProperty = this.properties[0];
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

  createProduct(requestDTO: Product) {
    let subscription = this.productsService.createProduct(requestDTO).subscribe(
      (response: any) => {

        this.createdProductId = response.data.id;
        this.successMessage = response.message;
        this.getProductInvoice();
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
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
        this.createProductForm.reset();
        this.isProcessing = false;
      }, (error: any) => {
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
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
