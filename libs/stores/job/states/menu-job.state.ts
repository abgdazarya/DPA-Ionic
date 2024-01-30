import { JobModel } from '@controllers/menu-job';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponsePagination,
} from '@shared';

export interface MenuJobState {
  landing: DataResponsePagination<JobModel> | undefined | null;
  footer: DataResponsePagination<JobModel> | undefined | null;
  list: DataResponsePagination<JobModel> | undefined | null;
  detail: DataResponse<JobModel> | undefined | null;
  latest: DataResponsePagination<JobModel> | undefined | null;
  recommendation: DataResponsePagination<JobModel> | undefined | null;
}

export const MENU_JOB_INITIAL_STATE: MenuJobState = {
  landing: DATA_RESPONSE_INITIAL_STATE,
  footer: DATA_RESPONSE_INITIAL_STATE,
  list: DATA_RESPONSE_INITIAL_STATE,
  detail: DATA_RESPONSE_INITIAL_STATE,
  latest: DATA_RESPONSE_INITIAL_STATE,
  recommendation: DATA_RESPONSE_INITIAL_STATE,
};
