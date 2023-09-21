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

  constructor(private toastr: ToastrService,
    localService: LocalService) {
    this.lang = localService.getData('lang');
    if (this.lang != 'en')
      this.position = ToasterPosition.topLeft;
    else
      this.position = ToasterPosition.topRight;
  }


  /** show toast */
  public show(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.show(title, message, { positionClass });
  }
  /** show successful toast */
  public success(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.success(title, message, { positionClass });
  }
  /** show error toast */
  public error(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.error(title, message, { positionClass });
  }
  /** show info toast */
  public info(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.info(title, message, { positionClass });
  }
  /** show warning toast */
  public warning(title: string, message: string = '', positionClass: string = this.position) {
    this.toastr.warning(title, message, { positionClass });
  }
}
