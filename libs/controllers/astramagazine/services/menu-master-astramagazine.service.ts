import { Injectable } from '@angular/core';
import { MasterHttpClient } from '@clients';
import { DataResponse, convertToParams } from '@shared';
import { assignToDataResponse } from '@transformer';
import { Observable } from 'rxjs';
import { AstramagazineOptionModel } from '../models/astramagazine-option.model';

@Injectable({ providedIn: 'root' })
export class MenuMasterAstramagazineService {
  constructor(private client: MasterHttpClient) {}

  getOptionAstramagazine(
    payload: any
  ): Observable<DataResponse<AstramagazineOptionModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-option-astramagazine', { params })
      .pipe(assignToDataResponse(AstramagazineOptionModel));
  }
}
