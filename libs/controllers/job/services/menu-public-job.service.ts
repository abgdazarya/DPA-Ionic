import { Injectable } from '@angular/core';
import { MenuPublicHttpClient } from '@clients';
import { DataResponsePagination, convertToParams } from '@shared';
import { assignToPaginationResponse } from '@transformer';
import { Observable } from 'rxjs';
import { JobModel } from '../models/job.model';

@Injectable()
export class MenuPublicJobService {
  constructor(private client: MenuPublicHttpClient) {}

  getPublicListJob(payload: any): Observable<DataResponsePagination<JobModel>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-list-jobs', { params })
      .pipe(assignToPaginationResponse(JobModel));
  }
}
