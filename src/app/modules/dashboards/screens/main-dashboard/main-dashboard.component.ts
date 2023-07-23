import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  pageTitle: string = 'الرئيسية';

  cards: any[] = [
    {count: 10, title: 'جميع الادوار'},
    {count: 500, title: 'جميع المستودعات'},
    {count: 20, title: 'جميع الاقسام'},
    {count: 10, title: 'جميع المستخدمين'},
    {count: 50, title: 'جميع الثلاجات'},
    {count: 20, title: 'جميع الطلبات'}
  ]

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.toastr.success('Hello world!', '');
  }

}
