import { NewsModel } from '@controllers/menu-news';
import {
  DATA_RESPONSE_INITIAL_STATE,
  DataResponse,
  DataResponsePagination,
} from '@shared';

export interface MenuNewsState {
  landing: DataResponsePagination<NewsModel> | undefined | null;
  footer: DataResponsePagination<NewsModel> | undefined | null;
  list: DataResponsePagination<NewsModel> | undefined | null;
  detail: DataResponse<NewsModel> | undefined | null;
  latest: DataResponsePagination<NewsModel> | undefined | null;
  highlight: DataResponsePagination<NewsModel> | undefined | null;
  manage: DataResponse<NewsModel> | undefined | null;
}

export const MENU_NEWS_INITIAL_STATE: MenuNewsState = {
  landing: DATA_RESPONSE_INITIAL_STATE,
  footer: DATA_RESPONSE_INITIAL_STATE,
  list: DATA_RESPONSE_INITIAL_STATE,
  detail: DATA_RESPONSE_INITIAL_STATE,
  latest: DATA_RESPONSE_INITIAL_STATE,
  highlight: DATA_RESPONSE_INITIAL_STATE,
  manage: DATA_RESPONSE_INITIAL_STATE,
};
