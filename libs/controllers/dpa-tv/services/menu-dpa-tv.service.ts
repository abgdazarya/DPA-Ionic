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
import { DpaTvListDto } from '../dtos/dpatv-list.dto';
import { DpaTvModel } from '../models/dpa-tv.model';

@Injectable({ providedIn: 'root' })
export class MenuDpaTvService {
  constructor(private readonly client: MenuHttpClient) {}

  getListDpaTv(
    payload: DpaTvListDto
  ): Observable<DataResponsePagination<DpaTvModel>> {
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
      .get('get-dpa-tv', { params: encryptedParams })
      .pipe(assignToPaginationResponse(DpaTvModel));
  }

  getDetailDpaTv(payload: any): Observable<DataResponse<DpaTvModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-dpa-tv', { params })
      .pipe(assignToDataResponse(DpaTvModel));
  }
}
