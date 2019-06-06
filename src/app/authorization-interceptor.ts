import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  accessToken: string;

  constructor() {
    this.accessToken = this.getUserFromlocalStorage();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedRequest: any;
    const newHeaders = req.headers.set('Authorization', 'Bearer ' + this.accessToken);
    modifiedRequest = req.clone({ headers: newHeaders, url: req.url, body: req.body });
    return next.handle(modifiedRequest);
  }

  getUserFromlocalStorage() {
    return localStorage.getItem('token');
  }
}
