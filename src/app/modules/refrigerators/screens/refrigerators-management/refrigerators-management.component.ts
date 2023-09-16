import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RefrigeratorsService } from '../../remote-services/refrigerators.service';
import { Refrigerator } from '../../models/refrigerator';
import { SharedMessagesComponent } from 'src/app/modules/shared-components/components/shared-messages/shared-messages.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-refrigerators-management',
  templateUrl: './refrigerators-management.component.html',
  styleUrls: ['./refrigerators-management.component.css']
})
export class RefrigeratorsManagementComponent extends SharedMessagesComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  firstPageTitle: string = 'RefrigeratorsManagementScreen.PrimaryTitle';
  coloredPageTitle: string = 'RefrigeratorsManagementScreen.ColoredPrimaryTitle'
  secondPageTitle: string = 'RefrigeratorsManagementScreen.SecondaryPageTitle';

  createRefrigeratorForm = new FormGroup({
    refrigeratorName: new FormControl('', [Validators.required]),
    fromTemperature: new FormControl('', [Validators.required]),
    toTemperature: new FormControl('', [Validators.required])
  });

  updateRefrigeratorForm = new FormGroup({
    refrigeratorName: new FormControl('', [Validators.required]),
    fromTemperature: new FormControl('', [Validators.required]),
    toTemperature: new FormControl('', [Validators.required])
  });


  // page loading
  isLoading: boolean = false;

  // button loading
  isProcessing: boolean = false;

  refrigerators: Refrigerator[] = [];
  selectedRefrigerator: Refrigerator = new Refrigerator();

  @ViewChild('updateModalCloseButtonRef') updateModalCloseButtonRef!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private refrigeratorsService: RefrigeratorsService,
    private translateService: TranslateService) {
      super(translateService);
  }

  ngOnInit(): void {
    this.getRefrigerators();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateButtonClick() {
    if (this.createRefrigeratorForm.valid) {

      let requestDTO = new Refrigerator();

      requestDTO.name = this.createRefrigeratorForm.controls.refrigeratorName.value!;
      requestDTO.temperature_from = parseFloat(this.createRefrigeratorForm.controls.fromTemperature.value!);
      requestDTO.temperature_to = parseFloat(this.createRefrigeratorForm.controls.toTemperature.value!);

      this.isProcessing = true;
      this.isLoading = true;

      this.createRefrigerator(requestDTO);
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onUpdateButtonClick(id: number) {
    this.selectedRefrigerator = this.refrigerators.find(i => i.id == id)!;
    this.fetchSelectedRefrigeratorDataIntoModal();
  }

  onUpdateConfirmationClick() {
    if (this.updateRefrigeratorForm.valid) {
      this.isLoading = true;

      let requestDTO = new Refrigerator();

      requestDTO.id = this.selectedRefrigerator!.id;
      requestDTO.name = this.updateRefrigeratorForm.controls.refrigeratorName.value!;
      requestDTO.temperature_from = parseFloat(this.updateRefrigeratorForm.controls.fromTemperature.value!);
      requestDTO.temperature_to = parseFloat(this.updateRefrigeratorForm.controls.toTemperature.value!);

      this.updateRefrigerator(requestDTO);
      this.updateModalCloseButtonRef.nativeElement.click();
    } else
      this.toastr.warning(this.invalidInputWarningMessage, this.invalidInputWarningHeader);
  }

  onDeleteButtonClick(id: number) {
    this.selectedRefrigerator = this.refrigerators.find(i => i.id == id)!;
  }

  onDeleteConfirmationButtonClick() {
    this.isLoading = true;
    this.deleteRefrigerator();
  }

  getRefrigerators() {
    this.isLoading = true;
    let subscription = this.refrigeratorsService.getRefrigerators().subscribe(
      (response: any) => {
        this.refrigerators = response.data;
        this.isLoading = false;
        this.isProcessing = false;
      }, (error: any) => {
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
        this.isLoading = false;
      }
    );

    this.subscription.add(subscription);
  }

  createRefrigerator(requestDTO: Refrigerator) {
    let subscribtion = this.refrigeratorsService.createRefrigerator(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        this.refrigerators = response.data;
        this.isProcessing = false;
        this.isLoading = false;
      }, (error: any) => {
        this.isProcessing = false;
        this.isLoading = false;
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }

  fetchSelectedRefrigeratorDataIntoModal() {
    if (this.selectedRefrigerator) {
      this.updateRefrigeratorForm.controls.refrigeratorName.setValue(this.selectedRefrigerator.name);
      this.updateRefrigeratorForm.controls.fromTemperature.setValue(String(this.selectedRefrigerator.temperature_from));
      this.updateRefrigeratorForm.controls.toTemperature.setValue(String(this.selectedRefrigerator.temperature_to));
    }
  }

  updateRefrigerator(requestDTO: Refrigerator) {
    let subscription = this.refrigeratorsService.updateRefrigerator(requestDTO).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

        let updatedRefrigerator = this.refrigerators.find(i => i.id == requestDTO.id);
        Object.assign(updatedRefrigerator!, response.data);

        this.isLoading = false;
      }, (error: any) => {

        this.isLoading = false;
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }


  deleteRefrigerator() {
    let subscription = this.refrigeratorsService.deleteRefrigerator(this.selectedRefrigerator.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.refrigerators = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.error.errors)
          this.toastr.error(error.error.errors[0].value, error.error.message);
        else
          this.toastr.error(error.error.message);
      }
    );

    this.subscription.add(subscription);
  }
}