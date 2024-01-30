import { Injectable } from '@angular/core';
import { MenuHttpClient } from '@clients';
import {
  DataResponse,
  DataResponsePagination,
  convertToParams,
  encryptContent,
} from '@shared';
import { assignToDataResponse, assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { AstramagazineModel } from '../models/astramagazine.model';

@Injectable({ providedIn: 'root' })
export class MenuAstramagazineService {
  constructor(private client: MenuHttpClient) {}

  getListAstramagazine(
    payload: any
  ): Observable<DataResponsePagination<AstramagazineModel>> {
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
      .get('get-astra-magazine', { params: encryptedParams })
      .pipe(assignToPaginationResponse(AstramagazineModel));
  }

  getDetailAstramagazine(
    payload: any
  ): Observable<DataResponse<AstramagazineModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-astra-magazine', { params })
      .pipe(assignToDataResponse(AstramagazineModel));
  }
}
