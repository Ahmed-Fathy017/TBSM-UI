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

  errorOperationHeader!: string;
  successEditOperationHeader!: string;
  successCreateOperationHeader!: string;
  successDeleteOperationHeader!: string;
  successWithdrawOperationHeader!: string;
  successImportOperationHeader!: string;

  invalidReferigeratorTemperature!: string;


  constructor(private translate: TranslateService) {
    this.setNotificationMessages();
  }

  ngOnInit(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
  }

  setNotificationMessages() {
    let subscribtion = this.translate.get([
      'GeneralMessages.ErrorOperationHeader',
      'GeneralMessages.SuccessEditOperationHeader',
      'GeneralMessages.SuccessCreateOperationHeader',
      'GeneralMessages.SuccessDeleteOperationHeader',
      'GeneralMessages.SuccessWithdrawOperationHeader',
      'GeneralMessages.SuccessImportOperationHeader',

      'GeneralMessages.InvalidInputWarningHeader',
      'GeneralMessages.InvalidInputWarningMessage',
      'GeneralMessages.InvalidInputDuplicationMessage',
      'GeneralMessages.InvalidInputCountMessage',

      'RefrigeratorsManagementScreen.InvalidTemperature']).subscribe((translation: any) => {
        this.errorOperationHeader = translation['GeneralMessages.ErrorOperationHeader'];
        this.successEditOperationHeader = translation['GeneralMessages.SuccessEditOperationHeader'];
        this.successCreateOperationHeader = translation['GeneralMessages.SuccessCreateOperationHeader'];
        this.successDeleteOperationHeader = translation['GeneralMessages.SuccessDeleteOperationHeader'];
        this.successWithdrawOperationHeader = translation['GeneralMessages.SuccessWithdrawOperationHeader'];
        this.successImportOperationHeader = translation['GeneralMessages.SuccessImportOperationHeader'];

        this.invalidInputWarningHeader = translation['GeneralMessages.InvalidInputWarningHeader'];
        this.invalidInputWarningMessage = translation['GeneralMessages.InvalidInputWarningMessage'];
        this.invalidInputDuplicationMessage = translation['GeneralMessages.InvalidInputDuplicationMessage'];
        this.invalidInputCountMessage = translation['GeneralMessages.InvalidInputCountMessage'];

        this.invalidReferigeratorTemperature = translation['RefrigeratorsManagementScreen.InvalidTemperature'];

      });

    this.subscription.add(subscribtion);
  }

}
