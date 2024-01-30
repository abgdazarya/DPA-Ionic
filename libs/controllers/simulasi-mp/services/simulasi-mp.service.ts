import { Injectable } from '@angular/core';
import { SimulasiMpHttpClient } from '@clients';
import { DataResponse, convertToParams } from '@shared';
import { assignToDataResponse } from '@transformer';
import { Observable } from 'rxjs';
import { LoginDto } from '../dtos/login.dto';
import { SimulasiMPDto } from '../dtos/simulasi-mp.dto';
import { LoginSimulasiData } from '../models/login';
import { SimulasiMpData } from '../models/simulasi-mp.model';

@Injectable()
export class SimulasiMpService {
  constructor(private client: SimulasiMpHttpClient) {}

  getTokenMP(payload: LoginDto): Observable<DataResponse<LoginSimulasiData>> {
    const params = convertToParams(payload);
    return this.client
      .get('login', { params })
      .pipe(assignToDataResponse(LoginSimulasiData));
  }

  postSimulasiMP(
    payload: SimulasiMPDto
  ): Observable<DataResponse<SimulasiMpData>> {
    return this.client
      .post('simulasi', payload)
      .pipe(assignToDataResponse(SimulasiMpData));
  }
}
