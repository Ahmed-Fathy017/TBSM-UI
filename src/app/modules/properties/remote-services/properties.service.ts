import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { Property } from '../../products/models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService  extends AbstractRemoteService {

  constructor(private http: HttpClient,
  ) {
    super()
  }

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
