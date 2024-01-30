import { DpaTvModel } from '@controllers/menu-dpa-tv';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponsePagination,
} from '@shared';

export interface MenuDpaTvState {
  landing: DataResponsePagination<DpaTvModel> | undefined | null;
  footer: DataResponsePagination<DpaTvModel> | undefined | null;
  list: DataResponsePagination<DpaTvModel> | undefined | null;
  detail: DataResponse<DpaTvModel> | undefined | null;
  latest: DataResponsePagination<DpaTvModel> | undefined | null;
}

export const MENU_DPA_TV_INITIAL_STATE: MenuDpaTvState = {
  landing: DATA_RESPONSE_INITIAL_STATE,
  footer: DATA_RESPONSE_INITIAL_STATE,
  list: DATA_RESPONSE_INITIAL_STATE,
  detail: DATA_RESPONSE_INITIAL_STATE,
  latest: DATA_RESPONSE_INITIAL_STATE,
};
