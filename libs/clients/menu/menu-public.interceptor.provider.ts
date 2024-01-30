// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import { camelToSnakeCase } from '@shared';
// import { StorageService } from 'libs/services/common/storage.service';
// import { Observable, from, lastValueFrom } from 'rxjs';
// import { environment } from '../../../src/environments/environment';
// import { MENU_PUBLIC_HTTP_INTERCEPTORS } from './menu-public-http.client';

// @Injectable({ providedIn: 'root' })
// class MenuPublicInterceptor implements HttpInterceptor {
//   public data: any = {};

//   constructor(private storageService: StorageService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return from(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     let options: any = {
//       url: environment.apiEndpoint + environment.apiPaths.menuPublic + req.url,
//     };

//     if (req.method !== 'GET') {
//       const body = req.body;
//       let formattedBody: any = {};
//       for (const [key, value] of Object.entries(body)) {
//         formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
//       }

//       const formData = new FormData();
//       if (body instanceof FormData) {
//         for (const [key, value] of body.entries()) {
//           formData.append(`${camelToSnakeCase(key).toUpperCase()}`, value);
//         }
//       }

//       options = {
//         ...options,
//         body: body instanceof FormData ? formData : formattedBody,
//       };
//     }
//     req = req.clone(options);

//     return await lastValueFrom(next.handle(req));
//   }
// }

// export const MenuPublicInterceptorProvider: Provider = {
//   provide: MENU_PUBLIC_HTTP_INTERCEPTORS,
//   useClass: MenuPublicInterceptor,
//   multi: true,
// };
