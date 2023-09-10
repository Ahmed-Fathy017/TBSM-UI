import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Warehouse } from '../models/warehouse';
import { Property } from '../../products/models/property';


@Injectable({
  providedIn: 'root'
})
export class WarehousesService extends AbstractRemoteService {

  constructor(private http: HttpClient,
  ) {
    super()
  }

  getWarehouses() {
    let apiUrl = this.apiURl + `super_admin/view_warehouses`;

    return this.http.get(apiUrl);
  }

  createWarehouse(requestDTO: Warehouse) {
    let apiUrl = this.apiURl + `super_admin/add_warehouse`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateWarehouse(requestDTO: Warehouse) {
    let apiUrl = this.apiURl + `super_admin/update_warehouse/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteWarehouse(id: number) {
    let apiUrl = this.apiURl + `super_admin/delete_warehouse/${id}`;

    return this.http.post(apiUrl, {});
  }

  // generic api, can be used for both admin user and warehouse user
  getWarehouse(id?: number) {
    let apiUrl = this.apiURl + `warehouse/main`;

    if (id) {
      let httpHeaders: HttpHeaders = new HttpHeaders();
      // warehouse id should be added to headers
      // httpHeaders.append('Accept-Language', 'ar');
      let options = { headers: httpHeaders };
      return this.http.get(apiUrl, options);
    }

    return this.http.get(apiUrl);
  }

  // warehouse proeprties
  getWarehouseProperties() {
    let apiUrl = this.apiURl + `warehouse/view_properties`;

    return this.http.get(apiUrl);
  }

  createWarehouseProperty(requestDTO: Property) {
    let apiUrl = this.apiURl + `warehouse/add_property`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateWarehouseProperty(requestDTO: Property) {
    let apiUrl = this.apiURl + `warehouse/update_property/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteWarehouseProperty(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_property/${id}`;

    return this.http.post(apiUrl, {});
  }
}
