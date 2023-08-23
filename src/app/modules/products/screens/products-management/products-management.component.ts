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

  pageSize: number = 3;

  list = [
    {
      id: 1,
      title: "علم الدم",
      pagesCount: 0,
      pages: [1],
      selectedPage: 1,
      minPage: 1,
      products: [
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "C", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "C", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "C", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "D", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "D", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "D", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "E", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "E", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "E", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "F", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "F", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "G", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "G", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "G", code: "345898" },
        { name: "شيبس", quantity: "5", refrigerator: "SS", code: "345898" },

      ],
      paginatedItems: [
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
      ]
    },
    {
      id: 2,
      title: "علم الدم",
      pagesCount: 0,
      pages: [1],
      selectedPage: 1,
      minPage: 1,
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

      ],
      paginatedItems: [
        { name: "شيبس", quantity: "5", refrigerator: "B", code: "345898" },
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
    this.list.map(i => {
      i.pagesCount = Math.ceil(i.products.length / this.pageSize);
      i.pages = Array.from({ length: i.pagesCount }, (_, index) => index + 1);

      this.onPageChange(i.id, i.selectedPage);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageChange(id: number, pageNumber: number) {
    let selectedItem = this.list.find(i => i.id == id);

    if (selectedItem) {
      selectedItem.selectedPage = pageNumber;

      let startIndex = (pageNumber - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      selectedItem.paginatedItems = selectedItem.products.slice(startIndex, endIndex);
      console.log(selectedItem.paginatedItems)
    }
  }

  onNextPageClick(id: number) {
    let selectedItem = this.list.find(i => i.id == id);

    if (selectedItem) {
      let nextPageNumber = selectedItem.selectedPage + 1;
      if (nextPageNumber <= selectedItem.pagesCount)
        this.onPageChange(id, nextPageNumber)
    }
  }

  onPreviousPageClick(id: number) {
    let selectedItem = this.list.find(i => i.id == id);

    if (selectedItem) {
      let previousPageNumber = selectedItem.selectedPage - 1;
      if (previousPageNumber >= selectedItem.minPage)
        this.onPageChange(id, previousPageNumber)
    }
  }

  onUpdateButtonClick(id: string) {

  }

  onDeleteButtonClick(id: string) {

  }

}
