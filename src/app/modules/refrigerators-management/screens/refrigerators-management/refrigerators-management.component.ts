import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-refrigerators-management',
  templateUrl: './refrigerators-management.component.html',
  styleUrls: ['./refrigerators-management.component.css']
})
export class RefrigeratorsManagementComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'RefrigeratorsManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'RefrigeratorsManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'RefrigeratorsManagementScreen.SecondaryPageTitle';

  createRefrigeratorForm = new FormGroup({
    refrigeratorName: new FormControl('', [Validators.required]),
    fromTemperature: new FormControl('', [Validators.required]),
    toTemperature: new FormControl('', [Validators.required])
  });

  updateDRefrigeratorForm = new FormGroup({
    refrigeratorName: new FormControl('', [Validators.required]),
    fromTemperature: new FormControl('', [Validators.required]),
    toTemperature: new FormControl('', [Validators.required])
  });


  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  refrigerators: string[] = ['dep1', 'dep1','dep1','dep1','dep1','dep1','dep1','dep1','dep1','dep1']

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateButtonClick(id: string) {

  }

  onDeleteButtonClick(id: string) {
    
  }

  onCreateButtonClick() {
    
  }
}