// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import { camelToSnakeCase } from '@shared';
// import { HOME_HTTP_INTERCEPTORS } from 'libs/clients';
// import {
//   StorageKeyEnum,
//   StorageService,
// } from 'libs/services/common/storage.service';
// import { Observable, from, lastValueFrom } from 'rxjs';
// import { environment } from '../../../src/environments/environment';

// @Injectable({ providedIn: 'root' })
// class HomeInterceptor implements HttpInterceptor {
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
//       url: environment.apiEndpoint + environment.apiPaths.home + req.url,
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

// export const HomeInterceptorProvider: Provider = {
//   provide: HOME_HTTP_INTERCEPTORS,
//   useClass: HomeInterceptor,
//   multi: true,
// };
