import { Injectable } from '@angular/core';
import { MenuPublicHttpClient } from '@clients';
import { DataResponsePagination, convertToParams } from '@shared';
import { assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { PromotionModel } from '../models/promotion.model';

@Injectable()
export class MenuPublicPromotionService {
  constructor(private client: MenuPublicHttpClient) {}

  getPublicListPromotion(
    payload: any
  ): Observable<DataResponsePagination<PromotionModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-content-promo', { params })
      .pipe(assignToPaginationResponse(PromotionModel));
  }
}
