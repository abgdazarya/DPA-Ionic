import { Injectable } from '@angular/core';
import { EklaimAjukanHttpClient } from '@clients';
import { DataResponse } from '@shared';
import { assignToDataResponse } from '@transformer';
import { Observable } from 'rxjs';
import { AjukanModel } from '../models/e-klaim-ajukan.model';

@Injectable()
export class EklaimAjukanService {
  constructor(private readonly client: EklaimAjukanHttpClient) {}

  postAjukanEklaim(payload: any): Observable<DataResponse<AjukanModel>> {
    return this.client
      .post('mrisKlaim/KlaimController/checkNPK', payload)
      .pipe(assignToDataResponse(AjukanModel));
  }
}
