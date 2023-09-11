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

  getProperties() {
    let apiUrl = this.apiURl + `warehouse/view_properties`;

    return this.http.get(apiUrl);
  }

  createProperty(requestDTO: Property) {
    let apiUrl = this.apiURl + `warehouse/add_property`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateProperty(requestDTO: Property) {
    let apiUrl = this.apiURl + `warehouse/update_property/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteProperty(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_property/${id}`;

    return this.http.post(apiUrl, {});
  }
}
