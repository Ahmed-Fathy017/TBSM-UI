import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { Refrigerator } from '../models/refrigerator';

@Injectable({
  providedIn: 'root'
})
export class RefrigeratorsService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  getRefrigerators() {
    let apiUrl = this.apiURl + `warehouse/view_refrigerators`;

    return this.http.get(apiUrl);
  }

  createRefrigerator(requestDTO: Refrigerator) {
    let apiUrl = this.apiURl + `warehouse/add_refrigerator`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateRefrigerator(requestDTO: Refrigerator) {
    let apiUrl = this.apiURl + `warehouse/update_refrigerator/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteRefrigerator(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_refrigerator/${id}`;

    return this.http.post(apiUrl, {});
  }


}
