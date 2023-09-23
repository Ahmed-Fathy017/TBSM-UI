import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SupplyRequestsGroup } from '../../models/supply-requests-group';
import { SupplyChainsService } from '../../remote-services/supply-chains.service';
import { SupplyRequest } from '../../models/supply-request';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateOrder } from '../../models/update-order';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supply-requests-management',
  templateUrl: './supply-requests-management.component.html',
  styleUrls: ['./supply-requests-management.component.css']
})
export class SupplyRequestsManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  @Input('firstPageTitle') firstPageTitle: string = '';
  @Input('coloredPageTitle') coloredPageTitle: string = '';
  @Input('isExternalRequestsView') isExternalRequestsView: boolean = false;
  @Input('isInternalRequestsView') isInternalRequestsView: boolean = false;
  @Input('isMyRequestsView') isMyRequestsView: boolean = false;
  @Input('allowActions') allowActions: boolean = false;

  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  group: SupplyRequestsGroup = new SupplyRequestsGroup();

  pageSize: number = 8;

  selectedRequest: SupplyRequest = new SupplyRequest();
  selectedIndex: number = 0;

  cancelRequestForm = new FormGroup({
    reason: new FormControl('')
  });


  constructor(private toastr: ToasterService,
    private supplyChainsService: SupplyChainsService,
    private translateService: TranslateService) {
      super(translateService);
  }

  ngOnInit(): void {
    this.isLoading = true;

    if (this.isExternalRequestsView)
      this.getExternalSupplyRequests();
    else if (this.isInternalRequestsView)
      this.getInternalSupplyRequests();
    else if (this.isMyRequestsView)
      this.getAllSupplyRequests();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onPageChange(pageNumber: number) {

    this.group.selectedPage = pageNumber;

    let startIndex = (pageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.group.paginatedData = this.group.data.slice(startIndex, endIndex);
  }

  onNextPageClick() {

    let nextPageNumber = this.group.selectedPage + 1;
    if (nextPageNumber <= this.group.pagesCount)
      this.onPageChange(nextPageNumber)
  }

  onPreviousPageClick() {

    let previousPageNumber = this.group.selectedPage - 1;
    if (previousPageNumber >= this.group.minPage)
      this.onPageChange(previousPageNumber)
  }

  onConfirmButtonClick(id: number, index: number) {
    this.selectedRequest = this.group.data.find(i => i.id == id)!;

    let requestDTO: UpdateOrder = new UpdateOrder();
    requestDTO.order_id = this.selectedRequest.id;
    requestDTO.status = true;
    requestDTO.refuse_resone = '';

    this.group.lastSelectedPage = this.group.selectedPage;
    this.selectedIndex = index;

    this.isLoading = true;
    this.updateOrderStatus(requestDTO);
  }

  onDeleteButtonClick(id: number, index: number) {
    this.selectedRequest = this.group.data.find(i => i.id == id)!;
    this.selectedIndex = index;
  }

  onDeleteConfirmationButtonClick() {
    let requestDTO: UpdateOrder = new UpdateOrder();
    requestDTO.order_id = this.selectedRequest.id;
    requestDTO.status = false;
    requestDTO.refuse_resone = this.cancelRequestForm.controls.reason.value ?? '';

    this.group.lastSelectedPage = this.group.selectedPage;

    this.isLoading = true;
    this.updateOrderStatus(requestDTO);
  }

  // functions

  getExternalSupplyRequests() {
    let subscription = this.supplyChainsService.getExternalSupplyRequests().subscribe(
      (response: any) => {
        this.group.data = response.data;
        this.setupPagination();
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }

  getInternalSupplyRequests() {
    let subscription = this.supplyChainsService.getInternalSupplyRequests().subscribe(
      (response: any) => {
        this.group.data = response.data;
        this.setupPagination();
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }

  getAllSupplyRequests() {
    let subscription = this.supplyChainsService.getAllSupplyRequests().subscribe(
      (response: any) => {
        this.group.data = response.data;
        this.setupPagination();
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }

  updateOrderStatus(requestDTO: UpdateOrder) {
    let subscription = this.supplyChainsService.updateOrderStatus(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message, this.successEditOperationHeader);
        this.group.data.splice(this.selectedIndex, 1);
        this.setupPagination();
        this.isLoading = false;

      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message,this.errorOperationHeader);
      }
    );

    this.subscription.add(subscription);
  }


  setupPagination() {
    this.group.pagesCount = Math.ceil(this.group.data.length / this.pageSize);
    this.group.pages = Array.from({ length: this.group.pagesCount }, (_, index) => index + 1);
    this.group.selectedPage = this.group.lastSelectedPage ?? 1;
    this.group.minPage = 1;

    this.onPageChange(this.group.selectedPage);
  }
}
