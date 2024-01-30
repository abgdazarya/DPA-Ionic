// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import { camelToSnakeCase } from '@shared';
// import {
//   StorageKeyEnum,
//   StorageService,
// } from 'libs/services/common/storage.service';
// import { Observable, from, lastValueFrom } from 'rxjs';
// import { environment } from '../../../src/environments/environment';
// import { REFRESH_TOKEN_HTTP_INTERCEPTORS } from './refresh-token-http.client';

// @Injectable({ providedIn: 'root' })
// class RefreshTokenInterceptor implements HttpInterceptor {
//   public data: any = {};

//   constructor(private storageService: StorageService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return from(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     const token = await this.storageService.getStorage(
//       StorageKeyEnum.REFRESH_TOKEN
//     );

//     let options: any = {
//       url: environment.apiEndpoint + environment.apiPaths.auth + req.url,
//     };

//     if (token) {
//       options = {
//         ...options,
//         headers: req.headers.set('authorization', `Bearer ${token}`),
//       };
//     }

//     if (req.method !== 'GET') {
//       const body = req.body;
//       let formattedBody: any = {};
//       for (const [key, value] of Object.entries(body)) {
//         formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
//       }

//       options = {
//         ...options,
//         body: formattedBody,
//       };
//     }
//     req = req.clone(options);
//     return await lastValueFrom(next.handle(req));
//   }
// }

// export const RefreshTokenInterceptorProvider: Provider = {
//   provide: REFRESH_TOKEN_HTTP_INTERCEPTORS,
//   useClass: RefreshTokenInterceptor,
//   multi: true,
// };
