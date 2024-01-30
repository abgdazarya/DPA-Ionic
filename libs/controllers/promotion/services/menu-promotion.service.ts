import { Injectable } from '@angular/core';
import { MenuHttpClient } from '@clients';
import {
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
  convertToParams,
  encryptContent,
} from '@shared';
import {
  assignToArrayResponse,
  assignToDataResponse,
  assignToPaginationResponse,
} from '@transformer';
import { Observable } from 'rxjs';
import { PromotionListDto } from '../dtos/promotion-list.dto';
import { CategoryPromotionModel } from '../models/category-promotion.model';
import { CouponPromotionModel } from '../models/coupon-promotion.model';
import { CouponVerifyModel } from '../models/coupon-verify.model';
import { PromotionModel } from '../models/promotion.model';

@Injectable()
export class MenuPromotionService {
  constructor(private client: MenuHttpClient) {}

  getListPromotion(
    payload: PromotionListDto
  ): Observable<DataResponsePagination<PromotionModel>> {
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
      .get('get-content-promo', { params: encryptedParams })
      .pipe(assignToPaginationResponse(PromotionModel));
  }

  getDetailPromotion(payload: any): Observable<DataResponse<PromotionModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-promo', { params })
      .pipe(assignToDataResponse(PromotionModel));
  }

  getCategoryPromotion(
    payload: any
  ): Observable<DataResponseArray<CategoryPromotionModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-category-promo', { params })
      .pipe(assignToArrayResponse(CategoryPromotionModel));
  }

  getCouponVerify(payload: any): Observable<DataResponse<CouponVerifyModel>> {
    // const params = convertToParams(payload);
    return this.client
      .post('verify-code-promo', payload)
      .pipe(assignToDataResponse(PromotionModel));
  }

  submitCouponPromosi(
    payload: any
  ): Observable<DataResponse<CouponPromotionModel>> {
    const newPayload = {
      ...payload,
      namaPeserta: encryptContent(payload.namaPeserta),
      email: encryptContent(payload.email),
      noHp: encryptContent(payload.noHp),
    };
    return this.client
      .post('promo-acquisition', newPayload)
      .pipe(assignToDataResponse(PromotionModel));
  }
}
