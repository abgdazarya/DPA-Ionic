import { Injectable } from '@angular/core';
import { MenuPublicHttpClient } from '@clients';
import { DataResponsePagination, convertToParams } from '@shared';
import { assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { DpaTvModel } from '../models/dpa-tv.model';

@Injectable({ providedIn: 'root' })
export class MenuPublicDpaTvService {
  constructor(private readonly client: MenuPublicHttpClient) {}

  getPublicListDpaTv(
    payload: any
  ): Observable<DataResponsePagination<DpaTvModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-dpa-tv', { params })
      .pipe(assignToPaginationResponse(DpaTvModel));
  }
}
