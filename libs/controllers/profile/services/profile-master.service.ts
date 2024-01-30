import { Injectable } from '@angular/core';
import { MasterHttpClient } from '@clients';
import { DataResponseArray, convertToParams } from '@shared';
import { assignToArrayResponse } from '@transformer';
import { Observable } from 'rxjs';
import { AreaMappingDto } from '../dtos/area-maping.dto';
import { AreaMappingData } from '../models/area-mapping.model';

@Injectable({ providedIn: 'root' })
export class ProfileMasterService {
  constructor(private readonly client: MasterHttpClient) {}

  getAreaMapping(
    payload: AreaMappingDto
  ): Observable<DataResponseArray<AreaMappingData>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-option-alamat', {
        params,
      })
      .pipe(assignToArrayResponse(AreaMappingData));
  }
}
