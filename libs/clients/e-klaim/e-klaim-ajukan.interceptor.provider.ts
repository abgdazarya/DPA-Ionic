// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable, Provider } from '@angular/core';
// import { StorageService } from 'libs/services/common/storage.service';
// import { BehaviorSubject, Observable, from, lastValueFrom } from 'rxjs';
// import { environment } from '../../../src/environments/environment';
// import { EKLAIM_AJUKAN_HTTP_INTERCEPTORS } from './e-klaim-ajukan-http.client';

// @Injectable({ providedIn: 'root' })
// class EklaimAjukanInterceptor implements HttpInterceptor {
//   public data: any = {};

//   private readonly tokenSubject: BehaviorSubject<string> =
//     new BehaviorSubject<string>('');

//   headers!: any;
//   constructor(private storageService: StorageService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return from(this.handle(req, next));
//   }

//   async handle(req: HttpRequest<any>, next: HttpHandler) {
//     const body = req.body;
//     // const token = await this.storageService.getToken();
//     let headers = req.headers;
//     headers.set('Content-Type', 'application/x-www-form-urlencoded');
//     if (body.Token) {
//       headers.set('authorization', `Bearer ${body.Token}`);
//     }

//     let options: any = {
//       url: environment.apiEndpointEklaimPengajuan + req.url,
//       headers: headers,
//     };

//     if (req.method !== 'GET') {
//       const formData = new FormData();
//       formData.append('isMobile', body.isMobile);
//       formData.append('KdPeserta', body.KdPeserta);
//       formData.append('Password', body.Password);
//       formData.append('Token', body.Token);
//       formData.append('ID_PROFILE_DPA', body.ID_PROFILE_DPA);

//       options = {
//         ...options,
//         body: formData,
//       };
//     }
//     req = req.clone(options);
//     return await lastValueFrom(next.handle(req));
//   }
// }

// export const EklaimAjukanInterceptorProvider: Provider = {
//   provide: EKLAIM_AJUKAN_HTTP_INTERCEPTORS,
//   useClass: EklaimAjukanInterceptor,
//   multi: true,
// };
