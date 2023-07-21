import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
})
export class LoadingButtonComponent implements OnInit {
  /*************** Variables **********************/
  @Input() processing: boolean = false;
  @Input() formValid: boolean = true;
  @Input() disabled: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  /*************** Constructor **********************/
  constructor() { }

  /*************** Events **********************/
  ngOnInit(): void { }

  /*************** Functions **********************/
  checkDisabled() {
    if (this.processing) {
      return true;
    } else
      return !this.formValid;
  }

  tirggerOnClickEvent() {
    if (this.onClick)
      this.onClick.emit();
  }
}
