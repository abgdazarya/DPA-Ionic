// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import { apiEndpointLoginEklaim } from '@environment/environment';
// import { BehaviorSubject, Observable, from, lastValueFrom } from 'rxjs';
// import { EKLAIM_LOGIN_HTTP_INTERCEPTORS } from './e-klaim-login-http.client';
// import { environment } from '../../../src/environments/environment';

// @Injectable({ providedIn: 'root' })
// class EklaimLoginInterceptor implements HttpInterceptor {
//   public data: any = {};

//   private readonly tokenSubject: BehaviorSubject<string> =
//     new BehaviorSubject<string>('');

//   headers!: any;
//   constructor() {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return from(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     let options: any = {
//       url: environment.apiEndpointLoginEklaim + req.url,
//     };

//     if (req.method !== 'GET') {
//       const body = req.body;
//       const formData = new FormData();
//       formData.append('email', body.email);
//       formData.append('password', body.password);

//       options = {
//         ...options,
//         body: formData,
//       };
//     }
//     req = req.clone(options);
//     return await lastValueFrom(next.handle(req));
//   }
// }

// export const EklaimLoginInterceptorProvider: Provider = {
//   provide: EKLAIM_LOGIN_HTTP_INTERCEPTORS,
//   useClass: EklaimLoginInterceptor,
//   multi: true,
// };
