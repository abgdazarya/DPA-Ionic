import { Pagination } from './pagination';

export interface DataResponse<T> {
  data: T | undefined | null;
  code: string | undefined | null;
  message: string | undefined | null;
  status: boolean | null;
}

export interface DataResponseArray<T> {
  data: T[] | undefined | null;
  code: string | undefined | null;
  message: string | undefined | null;
  status: boolean | null;
}

export interface DataResponsePagination<T> {
  data:
    | {
        pagination: Pagination;
        data: T[];
      }
    | undefined
    | null;
  code: string | undefined | null;
  message: string | undefined | null;
  status: boolean | null;
}

export const DATA_RESPONSE_INITIAL_STATE = {
  data: undefined,
  code: undefined,
  message: undefined,
  status: null,
};

export const DATA_RESPONSE_INITIAL_STATE_FAILED = {
  data: null,
  code: null,
  message: null,
  status: null,
};

export interface FailedResponse<T> {
  code: string;
  message: string;
  status: boolean;
}
