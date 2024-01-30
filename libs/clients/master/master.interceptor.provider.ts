// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import { camelToSnakeCase } from '@shared';
// import { MASTER_HTTP_INTERCEPTORS } from 'libs/clients';
// import {
//   StorageKeyEnum,
//   StorageService,
// } from 'libs/services/common/storage.service';
// import { Observable, from, lastValueFrom } from 'rxjs';
// import { environment } from '../../../src/environments/environment';

// @Injectable({ providedIn: 'root' })
// class MasterInterceptor implements HttpInterceptor {
//   public data: any = {};

//   constructor(private storageService: StorageService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return from(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     const token = await this.storageService.getStorage(StorageKeyEnum.TOKEN);

//     let options: any = {
//       url: environment.apiEndpoint + environment.apiPaths.master + req.url,
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

// export const MasterInterceptorProvider: Provider = {
//   provide: MASTER_HTTP_INTERCEPTORS,
//   useClass: MasterInterceptor,
//   multi: true,
// };
