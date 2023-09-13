import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationLogs } from '../../models/operation-logs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OperationLogsService } from '../../remote-services/operation-logs.service';
import { GetOperationLogs } from '../../models/get-operations-logs';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { OperationTypes } from '../../models/operation-types';


@Component({
  selector: 'app-operation-logs',
  templateUrl: './operation-logs.component.html',
  styleUrls: ['./operation-logs.component.css']
})
export class OperationLogsComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'OprationsLogsScreen.PrimaryTitle';
  coloredPageTitle: string = 'OprationsLogsScreen.ColoredPrimaryTitle';
  secondPageTitle: string = 'OprationsLogsScreen.SecondaryPageTitle';

  operationLogsForm = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
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

  constructor(private toastr: ToastrService,
    private operationLogsService: OperationLogsService) {
  }

  ngOnInit(): void {
    this.setupPagination();
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

      this.getOperationLogs(requestDTO);
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onExportButtonClick() {
    // if (this.logs.data.length > 0) {

    //   let reportData = {
    //     title: 'Operation Logs Report',
    //     data: this.logs.data,
    //     headers: ['Operation']
    //   }

    //   this.isProcessing = true;
    //   this.exportExcel(reportData);
    // }
    // else
    //   this.toastr.info('لا توجد بيانات');

    if (this.operationLogsForm.valid) {
      let requestDTO: GetOperationLogs = new GetOperationLogs();

      requestDTO.date_from = this.operationLogsForm.controls.fromDate.value!;
      requestDTO.date_to = this.operationLogsForm.controls.toDate.value!;
      requestDTO.type = this.operationLogsForm.controls.type.value;
      requestDTO.is_export = true;
      this.isProcessing = true;

      this.getOperationLogs(requestDTO);
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onPageChange(pageNumber: number) {

    this.logs.selectedPage = pageNumber;

    let startIndex = (pageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.logs.paginatedData = this.logs.data.slice(startIndex, endIndex);
  }

  onNextPageClick() {

    let nextPageNumber = this.logs.selectedPage + 1;
    if (nextPageNumber <= this.logs.pagesCount)
      this.onPageChange(nextPageNumber)
  }

  onPreviousPageClick() {

    let previousPageNumber = this.logs.selectedPage - 1;
    if (previousPageNumber >= this.logs.minPage)
      this.onPageChange(previousPageNumber)
  }

  // functions

  getOperationLogs(requestDTO: GetOperationLogs) {

    console.log(requestDTO.is_export)

    let subscribtion = this.operationLogsService.getOperationLogs(requestDTO).subscribe(
      (response: any) => {
        console.log(response)

        if (requestDTO.is_export)
          window.open(response.data, "_blank");
        else {
          this.logs.data = response.data;
          this.setupPagination();
        }


        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        this.toastr.error(error.error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  setupPagination() {
    this.logs.pagesCount = Math.ceil(this.logs.data.length / this.pageSize);
    this.logs.pages = Array.from({ length: this.logs.pagesCount }, (_, index) => index + 1);
    this.logs.selectedPage = this.logs.lastSelectedPage ?? 1;
    this.logs.minPage = 1;

    this.onPageChange(this.logs.selectedPage);
  }


  // exportExcel(excelData: any) {
  //   console.log(excelData)
  //   //Title, Header & Data
  //   const title = excelData.title;
  //   const header = excelData.headers
  //   const data = excelData.data;

  //   //Create a workbook with a worksheet
  //   let workbook = new Workbook();
  //   let worksheet = workbook.addWorksheet('Operation Logs Report');

  //   // Define a custom font for Arabic text
  //   const arabicFont = { name: 'Arial', family: 2, size: 12, bold: false, italic: false };

  //   // Set the worksheet direction to RTL for Arabic text
  //   worksheet.views = [{ rightToLeft: true }];

  //   // Date
  //   let d = new Date();
  //   let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

  //   //Adding Header Row
  //   let headerRow = worksheet.addRow(header);
  //   headerRow.eachCell((cell, number) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: '4167B8' },
  //       bgColor: { argb: '' }
  //     }
  //     cell.font = {
  //       bold: true,
  //       color: { argb: 'FFFFFF' },
  //       size: 12
  //     }
  //   })

  //   //Adding Data with Conditional Formatting
  //   data.forEach((d: any) => {
  //     console.log(d)
  //     worksheet.addRow([d]).font = arabicFont; // Add Arabic text and apply font settings;
  //   }
  //   );

  //   worksheet.getColumn(1).width = 100;
  //   worksheet.addRow([]);

  //   //Footer Row
  //   let footerRow = worksheet.addRow(['Operation Logs Report Generated at ' + date]);
  //   footerRow.getCell(1).fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'FFB050' }
  //   };

  //   //Merge Cells
  //   // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

  //   //Generate & Save Excel File
  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     saveAs(blob, title + '.xlsx');
  //   })

  //   this.isProcessing = false;

  // }

}
