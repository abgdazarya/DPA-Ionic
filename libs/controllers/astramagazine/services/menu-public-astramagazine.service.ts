import { Injectable } from '@angular/core';
import { MenuPublicHttpClient } from '@clients';
import { DataResponsePagination, convertToParams } from '@shared';
import { assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { AstramagazineModel } from '../models/astramagazine.model';

@Injectable({ providedIn: 'root' })
export class MenuPublicAstramagazineService {
  constructor(private client: MenuPublicHttpClient) {}

  getPublicListAstramagazine(
    payload: any
  ): Observable<DataResponsePagination<AstramagazineModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-astra-magazine', { params })
      .pipe(assignToPaginationResponse(AstramagazineModel));
  }
}
