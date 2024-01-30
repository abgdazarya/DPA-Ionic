// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import {
//   StorageKeyEnum,
//   StorageService,
// } from 'libs/services/common/storage.service';
// import { Observable, from, lastValueFrom } from 'rxjs';
// import { environment } from '../../../src/environments/environment';
// import { EKLAIM_TRACK_HTTP_INTERCEPTORS } from './e-klaim-track-http.client';

// @Injectable({ providedIn: 'root' })
// class EklaimTrackInterceptor implements HttpInterceptor {
//   public data: any = {};

//   headers!: any;
//   constructor(private storageService: StorageService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return from(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     const token = await this.storageService.getStorage(StorageKeyEnum.TOKEN);
//     let headers = req.headers;
//     headers.set('Content-Type', 'application/x-www-form-urlencoded');
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }

//     let options: any = {
//       url: environment.apiEndpointEklaim + req.url,
//       headers: headers,
//     };

//     if (req.method !== 'GET') {
//       const body = req.body;
//       const formData = new FormData();
//       formData.append('isMobile', body.isMobile);
//       formData.append('KdPeserta', body.KdPeserta);
//       formData.append('Password', body.Password);

//       options = {
//         ...options,
//         body: formData,
//       };
//     }
//     req = req.clone(options);
//     return await lastValueFrom(next.handle(req));
//   }
// }

// export const EklaimTrackInterceptorProvider: Provider = {
//   provide: EKLAIM_TRACK_HTTP_INTERCEPTORS,
//   useClass: EklaimTrackInterceptor,
//   multi: true,
// };
