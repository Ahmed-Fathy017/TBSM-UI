import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationLogs } from '../../models/operation-logs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OperationLogsService } from '../../remote-services/operation-logs.service';
import { GetOperationLogs } from '../../models/get-operations-logs';
import { OperationTypes } from '../../models/operation-types';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';
import { ScreenTitleNavigationService } from 'src/app/modules/master-layout/services/screen-title-navigation.service';
import { ToasterService } from 'src/app/modules/master-layout/services/toaster.service';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';


@Component({
  selector: 'app-operation-logs',
  templateUrl: './operation-logs.component.html',
  styleUrls: ['./operation-logs.component.css']
})
export class OperationLogsComponent extends SharedMessagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'OprationsLogsScreen.PrimaryTitle';
  coloredPageTitle: string = 'OprationsLogsScreen.ColoredPrimaryTitle';
  secondPageTitle: string = 'OprationsLogsScreen.SecondaryPageTitle';

  operationLogsForm = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    type: new FormControl(''),
  });


  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  logs: OperationLogs = new OperationLogs();

  pageSize: number = 6;

  operationTypes = OperationTypes;

  excelLink: string = '';

  isRtl: boolean = false;

  isSearchApplied: boolean = false;

  // pagination related variables
  step: number = 1;

  get showFirstPageNavigator(): boolean {
    return this.logs.pagesCount > this.logs.maxDisplayedPagesCount && this.logs.selectedPage > this.logs.maxDisplayedPagesCount
  }

  get showLastPageNavigator(): boolean {
    let maxPageNumberBeforeLastPageDisplay = 0;
    if (this.logs.pagesCount % this.logs.maxDisplayedPagesCount > 0) {
      let division = Math.floor(this.logs.pagesCount / this.logs.maxDisplayedPagesCount);
      maxPageNumberBeforeLastPageDisplay = division * this.logs.maxDisplayedPagesCount;
    }
    else
      maxPageNumberBeforeLastPageDisplay = this.logs.pagesCount - this.logs.maxDisplayedPagesCount;

    return this.logs.pagesCount > this.logs.maxDisplayedPagesCount && this.logs.selectedPage <= maxPageNumberBeforeLastPageDisplay;
  }

  constructor(private toastr: ToasterService,
    private operationLogsService: OperationLogsService,
    private translateService: TranslateService,
    private screenTitleNavigationService: ScreenTitleNavigationService,
    private localService: LocalService) {
    super(translateService);
    this.screenTitleNavigationService.setScreenKey('OperationLogs');
    this.isRtl = this.localService.getData('lang') != 'en' ? true : false;
  }

  ngOnInit(): void {
    this.onSearchButtonClick();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSearchButtonClick() {
    if (this.operationLogsForm.valid) {
      let requestDTO: GetOperationLogs = new GetOperationLogs();

      requestDTO.date_from = this.operationLogsForm.controls.fromDate.value!;
      requestDTO.date_to = this.operationLogsForm.controls.toDate.value!;
      requestDTO.type = this.operationLogsForm.controls.type.value;
      requestDTO.is_export = false;

      this.isLoading = true;

      this.getOperationLogs(requestDTO, true);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onExportButtonClick() {
    Object.keys(this.operationLogsForm.controls).forEach(field => {
      const control = this.operationLogsForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if (this.operationLogsForm.valid) {
      let requestDTO: GetOperationLogs = new GetOperationLogs();

      requestDTO.date_from = this.operationLogsForm.controls.fromDate.value!;
      requestDTO.date_to = this.operationLogsForm.controls.toDate.value!;
      requestDTO.type = this.operationLogsForm.controls.type.value;
      requestDTO.is_export = true;
      this.isProcessing = true;

      this.getOperationLogs(requestDTO);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onPageChange(pageNumber: number) {

    this.logs.selectedPage = pageNumber;

    let startIndex = (pageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.logs.paginatedData = this.logs.data.slice(startIndex, endIndex);
  }

  onNextPageClick() {

    let nextPageNumber = this.logs.selectedPage + 1;
    if (nextPageNumber <= this.logs.pagesCount) {
      let maxDisplayedPage = Math.max(...this.logs.pages);
      if (this.logs.selectedPage == maxDisplayedPage)
        this.logs.pages = this.returnIncrementedPages(maxDisplayedPage);

      this.onPageChange(nextPageNumber)
    }
  }

  onNextMoreClick() {
    let maxDisplayedPage = Math.max(...this.logs.pages);

    if (maxDisplayedPage != this.logs.pagesCount) {
      this.logs.pages = this.returnIncrementedPages(maxDisplayedPage);
      this.onPageChange(maxDisplayedPage + 1);
    }
  }

  onPreviousPageClick() {

    let previousPageNumber = this.logs.selectedPage - 1;
    if (previousPageNumber >= this.logs.minPage) {
      let minDisplayedPage = Math.min(...this.logs.pages);
      if (this.logs.selectedPage == minDisplayedPage)
        this.logs.pages = this.returnDecrementedPages(minDisplayedPage - this.logs.maxDisplayedPagesCount);

      this.onPageChange(previousPageNumber);
    }
  }

  onPreviousMoreClick() {
    let minDisplayedPage = Math.min(...this.logs.pages);
    if (minDisplayedPage != this.logs.minPage) {
      this.logs.pages = this.returnDecrementedPages(minDisplayedPage - this.logs.maxDisplayedPagesCount);
      this.onPageChange(minDisplayedPage - 1);
    }
  }

  onFirstPageNavigatorClick() {
    this.logs.pages = this.returnDecrementedPages(this.logs.minPage);

    this.onPageChange(this.logs.minPage);
  }

  onLastPageNavigatorClick() {
    let maxPageNumberBeforeLastPageDisplay = 0;
    if (this.logs.pagesCount % this.logs.maxDisplayedPagesCount > 0) {
      let division = Math.floor(this.logs.pagesCount / this.logs.maxDisplayedPagesCount);
      maxPageNumberBeforeLastPageDisplay = division * this.logs.maxDisplayedPagesCount;
    }
    else
      maxPageNumberBeforeLastPageDisplay = this.logs.pagesCount - this.logs.maxDisplayedPagesCount;

    this.logs.pages = this.returnIncrementedPages(maxPageNumberBeforeLastPageDisplay);
    this.onPageChange(this.logs.pagesCount);
  }

  // functions

  getOperationLogs(requestDTO: GetOperationLogs, isFromSearchClick: boolean = false) {

    let subscribtion = this.operationLogsService.getOperationLogs(requestDTO).subscribe(
      (response: any) => {
        if (requestDTO.is_export)
          window.open(response.data, "_blank");
        else {
          this.logs.data = response.data;


          this.logs.data.push(...response.data);
          this.logs.data.push(...response.data);
          this.logs.data.push(...response.data);



          this.setupPagination();
        }

        this.isSearchApplied = isFromSearchClick;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors && error.error.errors.length > 0)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message, this.errorOperationHeader);
      }
    );

    this.subscription.add(subscribtion);
  }

  setupPagination() {
    this.logs.pagesCount = Math.ceil(this.logs.data.length / this.pageSize);
    this.logs.pages = this.returnIncrementedPages(0);

    this.logs.selectedPage = this.logs.lastSelectedPage ?? 1;
    this.logs.minPage = 1;

    this.onPageChange(this.logs.selectedPage);
  }

  returnIncrementedPages(start: number) {
    let pages: number[] = [];

    for (let i = 0; i < this.logs.maxDisplayedPagesCount; i++) {
      let pageNumber = (start + 1) + this.step * i;
      // checks if the page number is more than the maximum pages count 
      // or not and so to prevent (eg. 9 10 11 12 while the maximum pages count is 10)
      // so the display will be 9 10 only as required
      if (pageNumber <= this.logs.pagesCount)
        pages.push(pageNumber);
      else
        break;
    }

    return pages;
  }

  returnDecrementedPages(start: number) {
    let pages: number[] = [];
    for (let i = 0; i < this.logs.maxDisplayedPagesCount; i++) {
      let pageNumber = start + this.step * i;
      pages.push(pageNumber);
    }

    return pages;
  }
}
