import { Injectable } from '@angular/core';
import { HomeHttpClient, ProfileHttpClient } from '@clients';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DATA_RESPONSE_INITIAL_STATE_FAILED,
  DataResponse,
  DataResponseArray,
  convertToParams,
} from '@shared';
import { assignToArrayResponse, assignToDataResponse } from '@transformer';
import { Observable, map, of } from 'rxjs';
import { AksesMenuModel } from '../models/akses-menu.model';
import { Popup } from '../models/popup.model';
import { BaseProfile } from '@controllers/profile';

@Injectable()
export class HomeService {
  constructor(
    private client: HomeHttpClient,
    private profileClient: ProfileHttpClient
  ) {}

  getUserInfo(payload: any): Observable<any> {
    return of(null);
    // const params = convertToParams(payload);
    // return this.profileClient
    //   .get('get-user-info', { params })
    //   .pipe(assignToDataResponse(UserInfo));
  }

  getCustomPopup(payload: any): Observable<DataResponseArray<Popup>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-custom-popup', { params })
      .pipe(assignToArrayResponse(Popup));
  }

  getPopupBirthdayResign(payload: any): Observable<DataResponseArray<Popup>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-popup-birthday-resign', { params })
      .pipe(assignToArrayResponse(Popup));
  }

  getAksesMenu(payload: any): Observable<DataResponse<AksesMenuModel>> {
    return this.client
      .get('get-akses-menu', { params: convertToParams(payload) })
      .pipe(assignToDataResponse(AksesMenuModel));
  }

  saveCustomerConcern(payload: any): Observable<DataResponse<BaseProfile>> {
    return this.client
      .post('save-cust-concern', payload)
      .pipe(assignToDataResponse(BaseProfile));
  }
}
