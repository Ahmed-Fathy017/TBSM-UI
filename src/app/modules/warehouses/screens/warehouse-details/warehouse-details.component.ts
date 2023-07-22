import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit {
  pageTitle: string = 'الرئيسية / المستودعات / المستودع الاول';

  cards: any[] = [
    { count: 10, title: 'منتجات نفذ كميتها', backgroundColor: '#0D99FF', iconClass: 'fa-solid fa-box', visibility: 'visible' },
    { count: 1, title: 'منتجات كميتها قليله', backgroundColor: '#FFA629', iconClass: 'fa-solid fa-box', visibility: 'visible' },
    { count: 12, title: 'درجه حراره متغيره', backgroundColor: '#F15A60', iconClass: 'fa-solid fa-temperature-three-quarters', visibility: 'visible' },
    { count: 0, title: 'تاريخ صلاحيه منتهي', backgroundColor: '#0D99FF', iconClass: 'fa-solid fa-calendar-days', visibility: 'visible' },
    { count: 0, title: 'تاريخ صلاحيه شارف علي الانتهاء', backgroundColor: '#FFA629', iconClass: 'fa-solid fa-calendar-days', visibility: 'visible' },
    { count: 0, title: 'تاريخ صلاحيه شارف علي الانتهاء', backgroundColor: '#FFA629', iconClass: 'fa-solid fa-calendar-days', visibility: 'invisible' },

  ];

  logs: string[] = [
    'قام احمد بسحب المنتج شيبس عدد 5 بتاريخ 2/7/2023',
    'قام خالد بادخال منتج جديد بأسم حاويات عدد 1 بتاريخ 1/7/2023',
    'قام خالد بالموافقة على طلب سلاسل امداد خارجية من المستودع الطائر بمنتج شيبس عدد 1',
    'قام المستودع الطائر بطلب سلاسل امداد خارجية منتج شيبس عدد 1'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
