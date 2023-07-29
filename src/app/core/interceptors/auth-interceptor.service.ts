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
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'ar')
    });

    return next.handle(req);
  }
}
