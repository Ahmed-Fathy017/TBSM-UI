import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  getDepartments() {
    let apiUrl = this.apiURl + `warehouse/view_categories`;

    return this.http.get(apiUrl);
  }

  createDepartment(requestDTO: Department) {
    let apiUrl = this.apiURl + `warehouse/add_category`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateDepartment(requestDTO: Department) {
    let apiUrl = this.apiURl + `warehouse/update_category/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteDepartment(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_category/${id}`;

    return this.http.post(apiUrl, {});
  }
}
