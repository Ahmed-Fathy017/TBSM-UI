import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouses-management',
  templateUrl: './warehouses-management.component.html',
  styleUrls: ['./warehouses-management.component.css']
})
export class WarehousesManagementComponent implements OnInit {

  firstPageTitle: string = 'الرئيسية / المستودعات / انشاء مستودع';
  secondPageTitle: string = 'جميع المستودعات';

  warehouses: string[] = ['المستودع الاول', 'المستودع الاول', 'المستودع الاول', 'المستودع الاول'];

  isProcessing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
