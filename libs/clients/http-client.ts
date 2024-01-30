import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

export declare class HttpClient {
  constructor(handler: HttpHandler);
}
