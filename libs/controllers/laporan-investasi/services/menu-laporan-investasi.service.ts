import { Injectable } from '@angular/core';
import { MenuHttpClient } from '@clients';
import {
  DataResponse,
  DataResponseArray,
  convertToParams,
  encryptContent,
} from '@shared';
import { assignToArrayResponse, assignToDataResponse } from '@transformer';
import { Observable } from 'rxjs';
import { LaporanInvestasiModel } from '../models/laporan-investasi.model';

@Injectable()
export class MenuLaporanInvestasiService {
  constructor(private client: MenuHttpClient) {}

  getListLaporanInvestasi(
    payload: any
  ): Observable<DataResponseArray<LaporanInvestasiModel>> {
    let params: any = {};
    if (payload?.noPeserta) {
      params = {
        ...payload,
        umur: encryptContent(payload?.umur),
        gaji: encryptContent(payload?.gaji),
        masaKerja: encryptContent(payload?.masaKerja),
        namaPeserta: encryptContent(payload?.namaPeserta),
        idPerusahaan: payload?.namaPerusahaan,
      };

      if (params?.namaPerusahaan) {
        delete params?.namaPerusahaan;
      }
    } else {
      params = {
        ...payload,
      };
    }

    let encryptedParams = convertToParams(params);

    return this.client
      .get('get-laporan-investasi', { params: encryptedParams })
      .pipe(assignToArrayResponse(LaporanInvestasiModel));
  }

  getDetailLaporanInvestasi(
    payload: any
  ): Observable<DataResponse<LaporanInvestasiModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-laporan-investasi', { params })
      .pipe(assignToDataResponse(LaporanInvestasiModel));
  }
}
