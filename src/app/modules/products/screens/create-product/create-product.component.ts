import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/modules/departments/models/department';
import { DepartmentsService } from 'src/app/modules/departments/remote-services/departments.service';
import { Refrigerator } from 'src/app/modules/refrigerators/models/refrigerator';
import { RefrigeratorsService } from 'src/app/modules/refrigerators/remote-services/refrigerators.service';

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

  departments: Department[] = [];
  refrigerators: Refrigerator[] = [];

  createProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    refrigerator: new FormControl('', [Validators.required]),
    externalSupply: new FormControl(false),
    number: new FormControl(''),
  });


  constructor(
    private toastr: ToastrService,
    private departmentsService: DepartmentsService,
    private refrigeratorsService: RefrigeratorsService,
  ) {


  }

  ngOnInit(): void {
    this.getDepartments();
    this.getRefrigerators();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {

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
        this.toastr.error(error.errors[0].value, error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

}
