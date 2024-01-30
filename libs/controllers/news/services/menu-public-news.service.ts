import { Injectable } from '@angular/core';
import { MenuPublicHttpClient } from '@clients';
import { DataResponsePagination, convertToParams } from '@shared';
import { assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { NewsModel } from '../models/news.model';

@Injectable()
export class MenuPublicNewsService {
  constructor(private readonly client: MenuPublicHttpClient) {}

  getPublicListNews(
    payload: any
  ): Observable<DataResponsePagination<NewsModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-news', { params })
      .pipe(assignToPaginationResponse(NewsModel));
  }
}
