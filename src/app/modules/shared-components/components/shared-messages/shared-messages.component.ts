import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-messages',
  templateUrl: './shared-messages.component.html',
  styleUrls: ['./shared-messages.component.css']
})
export class SharedMessagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  invalidInputWarningHeader!: string;
  invalidInputWarningMessage!: string;
  invalidInputDuplicationMessage!: string;
  invalidInputCountMessage!: string;


  constructor(private translate: TranslateService) {
    this.setInvalidInputWarningMessages();

  }

  ngOnInit(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
  }

  setInvalidInputWarningMessages() {
    let subscribtion = this.translate.get(['GeneralMessages.InvalidInputWarningHeader', 
    'GeneralMessages.InvalidInputWarningMessage', 
    'GeneralMessages.InvalidInputDuplicationMessage', 
    'GeneralMessages.InvalidInputCountMessage']).subscribe(
      (translation: any) => {
        this.invalidInputWarningHeader = translation['GeneralMessages.InvalidInputWarningHeader'];
        this.invalidInputWarningMessage = translation['GeneralMessages.InvalidInputWarningMessage'];
        this.invalidInputDuplicationMessage = translation['GeneralMessages.InvalidInputDuplicationMessage'];
        this.invalidInputCountMessage = translation['GeneralMessages.InvalidInputCountMessage'];
      });

    this.subscription.add(subscribtion);
  }

}
