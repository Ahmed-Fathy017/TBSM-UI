import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  /*************** Variables **********************/
  @Input() loading = false;

  /*************** Constructor **********************/
  constructor() {}

  /*************** Events **********************/
  ngOnInit(): void {}
  /*************** Functions **********************/
}
