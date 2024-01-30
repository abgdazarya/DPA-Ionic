import {
  HttpBackend,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { HttpHandler } from './http-client';
import { Observable } from 'rxjs';

class InterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

export class InterceptingHandler implements HttpHandler {
  private chain!: HttpHandler;

  constructor(
    private backend: HttpBackend,
    private interceptors: HttpInterceptor[]
  ) {
    this.buildChain();
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.chain.handle(req);
  }

  private buildChain(): void {
    this.chain = this.interceptors.reduceRight(
      (next, interceptor) => new InterceptorHandler(next, interceptor),
      this.backend
    );
  }
}
