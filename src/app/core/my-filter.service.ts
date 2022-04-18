import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyFilterService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // filter
    let token = localStorage.getItem('token');
    console.log(token);



    if(token){
      const authReq = req.clone({
        headers: req.headers
        
        .set('Authorization', "Bearer "+token)
      });
      console.log('ketti');

      return next.handle(authReq);
    }

    console.log('ketmadi');
    return next.handle(req);
  }
}
