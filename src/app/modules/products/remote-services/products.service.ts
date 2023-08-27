import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractRemoteService {

  constructor(private http: HttpClient) {
    super()
  }

  getProducts() {
    let apiUrl = this.apiURl + `warehouse/view_products`;

    return this.http.get(apiUrl);
  }

  // createProduct(requestDTO: Role) {
  //   let apiUrl = this.apiURl + `warehouse/add_product`;

  //   return this.http.post(apiUrl, requestDTO);
  // }

  deleteProduct(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_product/${id}`;

    return this.http.post(apiUrl, {});
  }
}
