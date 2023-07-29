import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService extends AbstractRemoteService {

  constructor(private http: HttpClient) { 
    super()
  }

  getWarehouses() {
    let apiUrl = this.apiURl + `super_admin/view_warehouses`;

    return this.http.get(apiUrl);
  }
}
