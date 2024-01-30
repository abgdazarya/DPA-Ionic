import { Injectable } from '@angular/core';
import {
  EklaimTrackHttpClient,
  MenuHttpClient,
  MenuPublicHttpClient,
} from '@clients';
import { DataResponse, DataResponsePagination, convertToParams } from '@shared';
import { assignToDataResponse, assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { TrackModel } from '../models/e-klaim-track.model';

@Injectable()
export class EklaimTrackService {
  constructor(private readonly client: EklaimTrackHttpClient) {}

  postTrackEklaim(payload: any): Observable<DataResponse<TrackModel>> {
    return this.client
      .post('Mobile/TrackingKlaim/checkKdPeserta', payload)
      .pipe(assignToDataResponse(TrackModel));
  }
}
