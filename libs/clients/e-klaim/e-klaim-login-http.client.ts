import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { HttpClientService } from '../http-client.service';

@Injectable({ providedIn: 'root' })
export class EklaimLoginHttpClient {
  constructor(private httpClient: HttpClientService) {}
  private mainPath =
    environment.apiEndpoint + environment.apiPaths.apiEndpointLoginEklaim;

  post(
    url: string,
    body: any | null,
    options?: {
      headers?: {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
    }
  ): Observable<any> {
    if (body?.Token) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
        },
      };
    }

    return this.httpClient.post(this.mainPath + url, body, options);
  }

  get(
    url: string,
    options?: {
      headers?: {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
    }
  ): Observable<any> {
    options = {
      ...options,
      headers: {
        ...options?.headers,
      },
    };

    return this.httpClient.get(this.mainPath + url, options);
  }

  patch(
    url: string,
    body: any | null,
    options?: {
      headers?: {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
    }
  ): Observable<any> {
    options = {
      ...options,
      headers: {
        ...options?.headers,
      },
    };

    return this.httpClient.patch(this.mainPath + url, body, options);
  }

  put(
    url: string,
    body: any | null,
    options?: {
      headers?: {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
    }
  ): Observable<any> {
    options = {
      ...options,
      headers: {
        ...options?.headers,
      },
    };

    return this.httpClient.put(this.mainPath + url, body, options);
  }

  delete(
    url: string,
    options?: {
      headers?: {
        [header: string]: string | string[];
      };
      params?: {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
    }
  ): Observable<any> {
    options = {
      ...options,
      headers: {
        ...options?.headers,
      },
    };

    return this.httpClient.put(this.mainPath + url, options);
  }
}
