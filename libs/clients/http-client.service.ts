import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
// import { CapacitorHttp, HttpOptions, HttpParams } from '@capacitor/core';
import { camelToSnakeCase } from '@shared';
import { Observable, from, of } from 'rxjs';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';

@Injectable({ providedIn: 'root' })
export class HttpClientService implements OnInit{
  isMobile: boolean = false;

  constructor(
    private http: HttpClient,
    private cordovaHttp: HTTP,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.screenSizeService.isMobileResolution()
      ? (this.isMobile = true)
      : (this.isMobile = false);
  }

  getBinaryFromFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', (err) => reject(err));

      reader.readAsBinaryString(file);
    });
  }

  post(
    url: string,
    body: FormData | any | null,
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
    let formattedBody: any = {};
    for (const [key, value] of Object.entries(body)) {
      formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
    }

    const formData = new FormData();
    if (body instanceof FormData) {
      for (const [key, value] of body.entries()) {
        formData.append(`${camelToSnakeCase(key).toUpperCase()}`, value);
      }
    }

    const clientOptions = {
      url: url,
      method: 'post',
      data: body instanceof FormData ? formData : formattedBody,
      headers: {
        'Content-Type':
          body instanceof FormData ? `multipart/form-data` : `application/json`,
        Accept: `application/json`,
        ...options?.headers,
      },
    };

    if(this.isMobile)
      return from(this.cordovaHttp.post(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));
    else
      return from(this.http.post(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));

    // return from(CapacitorHttp.request(clientOptions))
  }

  upload(
    url: string,
    body: FormData | any | null,
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
    let formattedBody: any = {};
    for (const [key, value] of Object.entries(body)) {
      formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
    }

    const formData = new FormData();
    if (body instanceof FormData) {
      for (const [key, value] of body.entries()) {
        formData.append(`${camelToSnakeCase(key).toUpperCase()}`, value);
      }
    }

    const clientOptions = {
      url: url,
      method: 'post',
      data: body instanceof FormData ? formData : formattedBody,
      headers: {
        ...options?.headers,
      },
    };

    if(this.isMobile)
      return from(this.cordovaHttp.post(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));
    else
      return from(this.http.post(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));
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
    let formattedParams: any = options?.params;

    if (options?.params) {
      for (const [key, value] of Object.entries(options?.params)) {
        if (value) {
          formattedParams[key] = value?.toString();
        }
      }
    }

    const clientOptions = {
      url: url,
      params: formattedParams,
      headers: {
        'Content-Type': `application/json`,
        Accept: `application/json`,
        ...options?.headers,
      },
    };

    if(this.isMobile)
     return from(this.cordovaHttp.get(url, clientOptions.params, { headers: {
      ...options?.headers,
    }}));
    else
      return from(this.http.get(url, { headers: clientOptions.headers, params: clientOptions.params }));

    // return from(CapacitorHttp.get(clientOptions));
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
    let formattedBody: any = {};
    for (const [key, value] of Object.entries(body)) {
      formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
    }

    const formData = new FormData();
    if (body instanceof FormData) {
      for (const [key, value] of body.entries()) {
        formData.append(`${camelToSnakeCase(key).toUpperCase()}`, value);
      }
    }

    const clientOptions = {
      url: url,
      method: 'patch',
      data: body instanceof FormData ? formData : formattedBody,
      headers: {
        'Content-Type':
          body instanceof FormData ? `multipart/form-data` : `application/json`,
        Accept: `application/json`,
        ...options?.headers,
      },
    };

    if(this.isMobile)
      return from(this.cordovaHttp.patch(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));
    else
      return from(this.http.patch(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));
    // return from(CapacitorHttp.request(clientOptions));
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
    let formattedBody: any = {};
    for (const [key, value] of Object.entries(body)) {
      formattedBody[`${camelToSnakeCase(key).toUpperCase()}`] = value;
    }

    const formData = new FormData();
    if (body instanceof FormData) {
      for (const [key, value] of body.entries()) {
        formData.append(`${camelToSnakeCase(key).toUpperCase()}`, value);
      }
    }

    const clientOptions = {
      url: url,
      method: 'put',
      data: body instanceof FormData ? formData : formattedBody,
      headers: {
        'Content-Type':
          body instanceof FormData ? `multipart/form-data` : `application/json`,
        Accept: `application/json`,
        ...options?.headers,
      },
    };

    if(this.isMobile)
      return from(this.cordovaHttp.put(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));
    else
      return from(this.http.put(url, clientOptions.data, { headers: {
        ...options?.headers,
      }}));

    // return from(CapacitorHttp.request(clientOptions));
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
    const clientOptions = {
      url: url,
      headers: {
        'Content-Type': `application/json`,
        Accept: `application/json`,
        ...options?.headers,
      },
    };

    if(this.isMobile)
      return from(this.cordovaHttp.delete(url, options?.params, { headers: {
        ...options?.headers,
      }}));
    else
      return from(this.http.delete(url, { headers: clientOptions.headers, params: options?.params }));

    // return from(CapacitorHttp.delete(clientOptions));
  }
}
