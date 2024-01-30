import { createAction, on, props } from '@ngrx/store';
import {
  DataResponsePagination,
  InteractionType,
  dataComparable,
} from '@shared';
import { PromotionModel } from '../../models/promotion.model';

export const GetListPromotionSucceed = createAction(
  'Services.Menu.Promotion.Events.GetListPromotionSucceed',
  props<{
    response: DataResponsePagination<PromotionModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

const extractData = (
  current: DataResponsePagination<PromotionModel>,
  newest: DataResponsePagination<PromotionModel>
): DataResponsePagination<PromotionModel> => {
  if (newest?.data?.data) {
    if (current?.data?.data) {
      const data: PromotionModel[] = dataComparable(
        current.data.data,
        newest?.data?.data,
        'idPromosi'
      );
      current = {
        ...newest,
        data: {
          ...newest.data,
          data: data,
        },
      };
    } else {
      current = newest;
    }
  }
  return current;
};

export const GetListPromotionSucceedActionReducer = on(
  GetListPromotionSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...extractData(state?.[dataType], response),
      },
    };
  }
);

export const GetListPromotionSucceedInteractionActionReducer = on(
  GetListPromotionSucceed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: null,
        success: response?.message,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
