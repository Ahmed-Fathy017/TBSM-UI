import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RefrigeratorsService } from '../../remote-services/refrigerators.service';
import { Refrigerator } from '../../models/refrigerator';

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
    fromTemperature: new FormControl(0, [Validators.required]),
    toTemperature: new FormControl(0, [Validators.required])
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

  refrigerators: Refrigerator[] = [];
  selectedRefrigerator: Refrigerator = new Refrigerator();


  constructor(
    private toastr: ToastrService,
    private refrigeratorsService: RefrigeratorsService) {

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
      requestDTO.temperature_from = this.createRefrigeratorForm.controls.fromTemperature.value!;
      requestDTO.temperature_to = this.createRefrigeratorForm.controls.toTemperature.value!;

      this.isProcessing = true;
      this.isLoading = true;

      this.createRefrigerator(requestDTO);
    } else
      this.toastr.warning('برجاء ادخال القيم بطريقة صحيحة!', 'تحذير');
  }

  onUpdateButtonClick(id: number) {
    this.selectedRefrigerator = this.refrigerators.find(i => i.id == id)!;

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
        this.toastr.error(error.errors[0].value, error.error.message);
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
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscribtion);
  }


  deleteRefrigerator() {
    let subscription = this.refrigeratorsService.deleteRefrigerator(this.selectedRefrigerator.id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        console.log(response.data)
        this.refrigerators = response.data;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        this.toastr.error(error.errors[0].value, error.error.message);
      }
    );

    this.subscription.add(subscription);
  }
}