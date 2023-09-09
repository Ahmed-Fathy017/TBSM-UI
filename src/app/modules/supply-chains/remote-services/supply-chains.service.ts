import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';
import { AddOrder } from '../models/add-order';
import { UpdateOrder } from '../models/update-order';

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

  updateOrderStatus(requestDTO: UpdateOrder) {
    let apiUrl = this.apiURl + `warehouse/supply_chains/store_status_order`;

    return this.http.post(apiUrl, requestDTO);
  }

  getExternalSupplyRequests() {
    let apiUrl = this.apiURl + `warehouse/supply_chains/get_external_supply_requests`;

    return this.http.get(apiUrl);
  }

  getInternalSupplyRequests() {
    let apiUrl = this.apiURl + `warehouse/supply_chains/get_internal_supply_requests`;

    return this.http.get(apiUrl);
  }

  getAllSupplyRequests() {
    let apiUrl = this.apiURl + `warehouse/supply_chains/get_all_supply_requests`;

    return this.http.get(apiUrl);
  }
}
