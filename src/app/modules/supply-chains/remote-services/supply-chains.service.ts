import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';
import { AddOrder } from '../models/add-order';

@Injectable({
  providedIn: 'root'
})
export class SupplyChainsService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  addOrderRequest(requestDTO: AddOrder) {
    let apiUrl = this.apiURl + `warehouse/supply_chains/add_order_request`;

    return this.http.post(apiUrl, requestDTO);
  }
}
