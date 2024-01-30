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
import { JobModel } from '../models/job.model';

@Injectable()
export class MenuJobService {
  constructor(private client: MenuHttpClient) {}

  getListJob(payload: any): Observable<DataResponsePagination<JobModel>> {
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
      .get('get-list-jobs', { params: encryptedParams })
      .pipe(assignToPaginationResponse(JobModel));
  }

  getDetailJob(payload: any): Observable<DataResponse<JobModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-jobs', { params })
      .pipe(assignToDataResponse(JobModel));
  }
}
