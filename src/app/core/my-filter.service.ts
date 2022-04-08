import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyFilterService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // filter
    req.headers.append("Cookie", "JSESSIONID=6A814C7E6937F1C0E4BCB11DCB8711CD");
    
    return next.handle(req);
  }
}
