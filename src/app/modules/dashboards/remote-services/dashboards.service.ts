import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService extends AbstractRemoteService {

  constructor(private http: HttpClient) {
    super()
  }


  getAdminDashboardData() {
    let apiURl = this.apiURl + `super_admin/main`;

    return this.http.get(apiURl);
  }

}
