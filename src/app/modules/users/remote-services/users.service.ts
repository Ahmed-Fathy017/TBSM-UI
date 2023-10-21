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
    let apiUrl = this.apiURl + `warehouse/view_users`;

    return this.http.get(apiUrl);
  }

  createUser(requestDTO: User) {
    let apiUrl = this.apiURl + `warehouse/add_user`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateUser(requestDTO: User) {
    let apiUrl = this.apiURl + `warehouse/update_user/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateUserStatus(id: number) {
    let apiUrl = this.apiURl + `warehouse/change_status/${id}`;

    return this.http.post(apiUrl, {});
  }

  deleteUser(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_user/${id}`;

    return this.http.post(apiUrl, {});
  }


}