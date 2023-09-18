import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IScreenNavigator } from 'src/app/modules/master-layout/models/screen-navigator';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('pageTitle') pageTitle!: string;
  @Input('coloredPageTitle') coloredPageTitle!: string;
  @Input() screenNavigators: IScreenNavigator[] = [];

  @Input() isNavigator: boolean = false;
  
  constructor() { }


  ngOnInit(): void {

    this.isNavigator = this.screenNavigators && this.screenNavigators.length > 0;

    if (this.coloredPageTitle)
      this.pageTitle + `${this.coloredPageTitle}`;
  }


}
