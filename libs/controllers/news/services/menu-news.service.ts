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
import { NewsModel } from '../models/news.model';

@Injectable()
export class MenuNewsService {
  constructor(private readonly client: MenuHttpClient) {}

  getListNews(payload: any): Observable<DataResponsePagination<NewsModel>> {
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
      .get('get-news', { params: encryptedParams })
      .pipe(assignToPaginationResponse(NewsModel));
  }

  getDetailNews(payload: any): Observable<DataResponse<NewsModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-news', { params })
      .pipe(assignToDataResponse(NewsModel));
  }

  setReadNews(payload: any): Observable<DataResponse<NewsModel>> {
    return this.client
      .post('post-news-read-byuser', payload)
      .pipe(assignToDataResponse(NewsModel));
  }
}
