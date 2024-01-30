import { Injectable } from '@angular/core';
import { EklaimLoginHttpClient } from '@clients';
import { DataResponse } from '@shared';
import { assignToDataResponse } from '@transformer';
import { Observable } from 'rxjs';
import { EklaimLoginModel } from '../models/e-klaim-login.model';

@Injectable()
export class EklaimLoginService {
  constructor(private readonly client: EklaimLoginHttpClient) {}

  postLoginEklaim(payload: any): Observable<DataResponse<EklaimLoginModel>> {
    return this.client
      .post('auth/login', payload)
      .pipe(assignToDataResponse(EklaimLoginModel));
  }
}
