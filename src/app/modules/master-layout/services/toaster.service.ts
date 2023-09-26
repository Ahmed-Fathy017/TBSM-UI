import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from '../../shared-components/services/local.service';
import { ToasterPosition } from '../models/toaster-position';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  lang: string = '';
  position: string = ToasterPosition.topLeft;
  isRtl: boolean = true;

  constructor(private toastr: ToastrService,
    localService: LocalService) {
    this.lang = sessionStorage.getItem('lang')!;
    if (this.lang != 'en') {
      this.position = ToasterPosition.topLeft;
      this.isRtl = true;
    }
    else {
      this.position = ToasterPosition.topRight;
      this.isRtl = false;
    }
  }


  /** show toast */
  public show(message: string, title: string = '', positionClass: string = this.position) {
    this.toastr.show(title, message, { positionClass, toastClass: this.isRtl ? '' : '' });
  }
  /** show successful toast */
  public success(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.success(title, message, { positionClass,toastClass: this.isRtl ? 'ngx-toastr custom-toast-rtl' : 'ngx-toastr custom-toast-ltr', closeButton: true});
  }
  /** show error toast */
  public error(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.error(title, message, { positionClass,toastClass: this.isRtl ? 'ngx-toastr custom-toast-rtl' : 'ngx-toastr custom-toast-ltr', closeButton: true});
  }
  /** show info toast */
  public info(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.info(title, message, { positionClass, toastClass: this.isRtl ? 'ngx-toastr custom-toast-rtl' : 'ngx-toastr custom-toast-ltr', closeButton: true });
  }
  /** show warning toast */
  public warning(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.warning(title, message, { positionClass,toastClass: this.isRtl ? 'ngx-toastr custom-toast-rtl' : 'ngx-toastr custom-toast-ltr', closeButton: true});
  }
}
