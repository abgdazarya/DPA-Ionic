// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpResponse,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';

// // import { apiEndpoint, apiPaths } from '@environment/environment';
// import { CapacitorHttp } from '@capacitor/core';
// import { camelToSnakeCase } from '@shared';
// import { AUTH_HTTP_INTERCEPTORS } from 'libs/clients';
// import {
//   StorageKeyEnum,
//   StorageService,
// } from 'libs/services/common/storage.service';
// import { Observable, from, lastValueFrom, map, of } from 'rxjs';
// import { environment } from '../../../src/environments/environment';

// @Injectable({ providedIn: 'root' })
// class AuthInterceptor implements HttpInterceptor {
//   public data: any = {};

//   constructor(private storageService: StorageService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return of(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

//     let options: any = {
//       url: environment.apiEndpoint + environment.apiPaths.auth + req.url,
//       headers: {
//         'Content-Type': `application/json`,
//         Accept: `application/json`,
//       },
//     };

//     let modifiedRequest = req.clone({
//       setHeaders: {
//         //DO WORK HERE
//       },
//     });

//     if (token) {
//       options = {
//         ...options,
//         headers: {
//           ...options.headers,
//           Authorization: `Bearer ${token}`,
//         },
//       };
//     }

//     switch (req.method) {
//       case 'GET':
//         response = await CapacitorHttp.get(options);
//         break;
//       case 'POST':
//         const body = req.body;
//         let formattedBody: any = {};
//         for (const [key, value] of Object.entries(body)) {
//           formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
//         }

//         options = { ...options, data: formattedBody, body: formattedBody };
//         response = await CapacitorHttp.post(options);
//         break;

//       case 'PUT':
//         const response = await CapacitorHttp.put(options);
//         // return new HttpResponse({
//         //   body: response.
//         // });

//       default:
//         throw new Error(`invalid http method: ${req.method}`);
//     }

//     req = req.clone({headers: {}})

//    return next.handle().pipe(())

//   }
// }

// export const AuthInterceptorProvider: Provider = {
//   provide: AUTH_HTTP_INTERCEPTORS,
//   useClass: AuthInterceptor,
//   multi: true,
// };
