import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService extends AbstractRemoteService{

  constructor(private http: HttpClient) { 
    super()
  }

  getPackages() {
    let apiUrl = this.apiURl + `super_admin/view_packages`;

    return this.http.get(apiUrl);
  }
}
