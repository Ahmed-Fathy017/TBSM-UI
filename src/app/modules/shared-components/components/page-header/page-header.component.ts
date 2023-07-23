import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('pageTitle') pageTitle!: string;
  @Input('coloredPageTitle') coloredPageTitle!: string;
  
  constructor() { }

  ngOnInit(): void {

    if (this.coloredPageTitle)
      this.pageTitle + `${this.coloredPageTitle}`;
  }

}
