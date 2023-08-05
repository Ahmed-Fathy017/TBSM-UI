import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackagesService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  getPackages() {
    let apiUrl = this.apiURl + `super_admin/view_packages`;

    return this.http.get(apiUrl);
  }

  createPackage(requestDTO: Package) {
    console.log(requestDTO)
    let apiUrl = this.apiURl + `super_admin/add_package`;

    return this.http.post(apiUrl, requestDTO);
  }

  updatePackage(requestDTO: Package) {
    let apiUrl = this.apiURl + `super_admin/update_package/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deletePackage(id: number) {
    let apiUrl = this.apiURl + `super_admin/delete_package/${id}`;

    return this.http.post(apiUrl, {});
  }
}
