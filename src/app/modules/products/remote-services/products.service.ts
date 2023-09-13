import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRemoteService } from '../../shared-components/remote-services/abstract-remote-service';
import { Product } from '../models/product';
import { GetProductsRequest } from '../models/get-products-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractRemoteService {

  constructor(private http: HttpClient) {
    super()
  }

  getProducts(requestDTO: GetProductsRequest) {
    let apiUrl = this.apiURl + `warehouse/view_products`;

    let queryParams = new HttpParams();
    queryParams = queryParams.append("product_filter", requestDTO.product_filter);
    queryParams = queryParams.append("filter_type", requestDTO.filter_type);
    queryParams = queryParams.append("filter_value", requestDTO.filter_value);


    return this.http.get(apiUrl, { params: queryParams });
  }

  createProduct(requestDTO: Product) {
    let apiUrl = this.apiURl + `warehouse/add_product`;

    return this.http.post(apiUrl, requestDTO);
  }

  updateProduct(requestDTO: Product) {
    let apiUrl = this.apiURl + `warehouse/update_product/${requestDTO.id}`;

    return this.http.post(apiUrl, requestDTO);
  }

  deleteProduct(id: number) {
    let apiUrl = this.apiURl + `warehouse/delete_product/${id}`;

    return this.http.post(apiUrl, {});
  }

  getProductInvoice(id: number) {
    let apiUrl = this.apiURl + `warehouse/product_invoice/${id}`;

    return this.http.post(apiUrl, {});
  }

  getProdcuctByNumber(productNumber: string, quanity: number) {
    let apiUrl = this.apiURl + `warehouse/product_by_number`;

    let queryParams = new HttpParams();
    queryParams = queryParams.append("product_number", productNumber);
    queryParams = queryParams.append("quantity", quanity);

    return this.http.get(apiUrl, { params: queryParams });
  }

  withdrawProduct(requestDTO: object) {
    let apiUrl = this.apiURl + `warehouse/product_withdrawal`;

    return this.http.post(apiUrl, requestDTO);
  }
}
