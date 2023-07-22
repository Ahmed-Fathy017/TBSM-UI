import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packages-management',
  templateUrl: './packages-management.component.html',
  styleUrls: ['./packages-management.component.css']
})
export class PackagesManagementComponent implements OnInit {

  firstPageTitle: string = 'الرئيسية  /  الباقات  /  انشاء باقه';
  secondPageTitle: string = 'جميع الباقات';

  packages: string[] = ['الباقه الاولي', 'الباقه الاولي', 'الباقه الاولي', 'الباقه الاولي'];

  isProcessing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
