import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../../roles/models/role';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  getUsers() {
    let apiUrl = this.apiURl + `warehouse/view_roles`;

    return this.http.get(apiUrl);
  }

  createUser(requestDTO: User) {
    let apiUrl = this.apiURl + `warehouse/add_role`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateUser(requestDTO: User) {
    let apiUrl = this.apiURl + `warehouse/add_role`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteUser(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_role/${id}`;

    return this.http.post(apiUrl, {});
  }


}