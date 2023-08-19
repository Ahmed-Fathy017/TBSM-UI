import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Package } from 'src/app/modules/packages/models/package';
import { PackagesService } from 'src/app/modules/packages/remote-services/packages.service';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  firstPageTitle: string = 'PackagesManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'PackagesManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = '';

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  list = [
    {
      title: "علم الدم",
      products: [
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" }

      ]
    },
    {
      title: "علم الدم",
      products: [
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" }

      ]
    },
  ]

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  updateProductForm = new FormGroup({
    packageName: new FormControl('', [Validators.required]),
    refrigeratorSetting: new FormControl('', [Validators.required]),
    productSetting: new FormControl('', [Validators.required]),
    departmentSetting: new FormControl('', [Validators.required]),
    temperatureAlert: new FormControl(false),
    externalSupply: new FormControl(false),
  });

  selectedPackage?: Package;

  constructor(
    private toastr: ToastrService,
    private packagesService: PackagesService) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateButtonClick(id: string) {

  }

  onDeleteButtonClick(id: string) {

  }

}
