import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/modules/products/models/property';
import { PropertyTypes } from 'src/app/modules/products/models/property-types';
import { WarehousesService } from 'src/app/modules/warehouses/remote-services/warehouses.service';
import { PropertiesService } from '../../remote-services/properties.service';

@Component({
  selector: 'app-properties-management',
  templateUrl: './properties-management.component.html',
  styleUrls: ['./properties-management.component.css']
})
export class PropertiesManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'PropertiesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'PropertiesManagementScreen.ColoredPrimaryTitle';
  secondPageTitle: string = 'PropertiesManagementScreen.SecondaryPageTitle';

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

   // page loading
   isLoading: boolean = false;

   // button loading
   isProcessing: boolean = false;

  propetyTypes = PropertyTypes;

  createPropertyForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    required: new FormControl(false)
  });

  updatePropertyForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    required: new FormControl(false)
  });

  properties: Property[] = [];
  selectedProperty: Property = new Property();

  constructor(
    private toastr: ToastrService,
    private propertiesService: PropertiesService,
    private router: Router) { }


  // events
  ngOnInit(): void {
    this.isLoading = true;
    this.getWarehouseProperties();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {
    if (this.createPropertyForm.valid) {
      let requestDTO = new Property();

      requestDTO.name = this.createPropertyForm.controls.name.value!;
      requestDTO.type = this.propetyTypes.find(i => i.value == this.createPropertyForm.controls.type.value)?.value!;
      requestDTO.required_status = this.createPropertyForm.controls.required.value!;

      // this.properties.push(property);
      this.isProcessing = true;
      this.isLoading = true;
      this.createWarehouseProperty(requestDTO);

    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onUpdateButtonClick(id: number) {
    this.selectedProperty = this.properties.find(i => i.id == id)!;
    this.fetchSelectedWarehouseDataIntoModal();
  }

  onUpdateConfirmationClick() {
    if (this.updatePropertyForm.valid) {
        this.isLoading = true;
  
        let requestDTO = new Property();
  
        requestDTO.id = this.selectedProperty!.id;
        requestDTO.name = this.updatePropertyForm.controls.name.value!;
        requestDTO.type = this.updatePropertyForm.controls.type.value!;
        requestDTO.required_status = this.updatePropertyForm.controls.required.value!;
  
        this.updateWarehouseProperty(requestDTO);
        this.updateModalCloseButtonRef.nativeElement.click();
      } else
        this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onDeleteButtonClick(id: number) {
    this.selectedProperty = this.properties.find(i => i.id == id)!;
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deleteWarehouseProperty();
  }

  // functions
  getWarehouseProperties() {
    let subscribtion = this.propertiesService.getProperties().subscribe(
      (response: any) => {
        console.log(response)
        this.properties = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscribtion);
  }

  createWarehouseProperty(requestDTO: Property) {
    let subscribtion = this.propertiesService.createProperty(requestDTO).subscribe(
      (response: any) => {
        console.log(response)
        this.toastr.success(response.message);
        this.properties = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isProcessing = false;
        this.isLoading = false;
      }
    );

    this.subscription.add(subscribtion);
  }

  fetchSelectedWarehouseDataIntoModal() {
    if (this.selectedProperty) {

      this.updatePropertyForm.controls.name.setValue(this.selectedProperty.name);
      this.updatePropertyForm.controls.type.setValue(this.selectedProperty.type);
      this.updatePropertyForm.controls.required.setValue(this.selectedProperty.required_status);
    }
  }

  updateWarehouseProperty(requestDTO: Property) {
    let subscribtion = this.propertiesService.updateProperty(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let updatedPackage = this.properties.find(i => i.id == requestDTO.id);
        Object.assign(updatedPackage!, response.data);
        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscribtion);
  }

  deleteWarehouseProperty() {
    let subscribtion = this.propertiesService.deleteProperty(this.selectedProperty.id).subscribe(
      (response: any) => {
        console.log(response)
        this.toastr.success(response.message);
        this.properties = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.toastr.error(error.error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscribtion);
  }
}
