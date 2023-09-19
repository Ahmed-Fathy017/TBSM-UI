import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/modules/shared-components/services/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localService: LocalService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add the Authorization, Centent-Type, Accept-Language header to the request    
    req = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${this.localService.getData('token')}`)
        // .set('Content-Type', 'application/json')
        .set('Accept-Language', this.localService.getData('lang') || 'ar')
    });

    // if the warehouseId (in super admin case) will add the warehouse-id header to the request
    if (this.localService.getData('warehouseId'))
      // Append the warehouse-id header
      req = req.clone({
        headers: req.headers.append('warehouse-id', this.localService.getData('warehouseId'))
      });


    return next.handle(req);
  }
}
