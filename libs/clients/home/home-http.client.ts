import { Injectable } from '@angular/core';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { HttpClientService } from '../http-client.service';

@Injectable({ providedIn: 'root' })
export class HomeHttpClient {
  constructor(
    private storageService: StorageService,
    private httpClient: HttpClientService
  ) {}
  private mainPath = environment.apiEndpoint + environment.apiPaths.home;

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
    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
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
    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

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
    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

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
    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

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
    const token = this.storageService.getStorage(StorageKeyEnum.TOKEN);

    if (token) {
      options = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return this.httpClient.put(this.mainPath + url, options);
  }
}
