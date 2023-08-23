import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  getRoles() {
    let apiUrl = this.apiURl + `warehouse/view_roles`;

    return this.http.get(apiUrl);
  }

  getPermissions() {
    let apiUrl = this.apiURl + `warehouse/view_permissions`;

    return this.http.get(apiUrl);
  }

  deleteRole(id: string) {
    let apiUrl = this.apiURl + `warehouse/delete_role/${id}`;

    return this.http.post(apiUrl, {});
  }

  // createRole(requestDTO: Role) {
  //   let apiUrl = this.apiURl + `warehouse/add_role`;

  //   return this.http.post(apiUrl, requestDTO);
  // }
}
