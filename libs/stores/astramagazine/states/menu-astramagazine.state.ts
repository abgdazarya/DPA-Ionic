import {
  AstramagazineModel,
  AstramagazineOptionModel,
} from '@controllers/menu-astramagazine';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponsePagination,
} from '@shared';

export interface MenuAstramagazineState {
  landing: DataResponsePagination<AstramagazineModel> | undefined | null;
  footer: DataResponsePagination<AstramagazineModel> | undefined | null;
  list: DataResponsePagination<AstramagazineModel> | undefined | null;
  manage: DataResponsePagination<AstramagazineModel> | undefined | null;
  detail: DataResponse<AstramagazineModel> | undefined | null;
  latest: DataResponsePagination<AstramagazineModel> | undefined | null;
  option: DataResponse<AstramagazineOptionModel> | undefined | null;
}

export const MENU_ASTRAMAGAZINE_INITIAL_STATE: MenuAstramagazineState = {
  landing: DATA_RESPONSE_INITIAL_STATE,
  footer: DATA_RESPONSE_INITIAL_STATE,
  list: DATA_RESPONSE_INITIAL_STATE,
  manage: DATA_RESPONSE_INITIAL_STATE,
  detail: DATA_RESPONSE_INITIAL_STATE,
  latest: DATA_RESPONSE_INITIAL_STATE,
  option: DATA_RESPONSE_INITIAL_STATE,
};
