import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable() /* if providedIn is not there,
  we can add it in app module and whole app will be intercepted */

export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  // will intercept all the subsequent requests that hits the REST API(post-login)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request); // original request

    // idea is to update http request header with bearer token
    // the token is saved in session storage
    // let's access the token from sessionStorage
    const authToken = localStorage.getItem('authToken')
    
    // Now, let's manipulate the req header with the above authToken as bearer token
    request = request.clone({
      setHeaders: {
        authorization: `Bearer ${authToken}`
      }
    })

    return next.handle(request);
  }
}
