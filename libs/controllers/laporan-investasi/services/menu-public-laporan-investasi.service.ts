import { Injectable } from '@angular/core';
import { MenuPublicHttpClient } from '@clients';
import { DataResponseArray, convertToParams } from '@shared';
import { assignToArrayResponse } from '@transformer';
import { Observable } from 'rxjs';
import { LaporanInvestasiModel } from '../models/laporan-investasi.model';

@Injectable()
export class MenuPublicLaporanInvestasiService {
  constructor(private client: MenuPublicHttpClient) {}

  getPublicListLaporanInvestasi(
    payload: any
  ): Observable<DataResponseArray<LaporanInvestasiModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-laporan-investasi', { params })
      .pipe(assignToArrayResponse(LaporanInvestasiModel));
  }
}
