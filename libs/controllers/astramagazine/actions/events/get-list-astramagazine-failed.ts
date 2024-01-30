import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { AstramagazineModel } from '../../models/astramagazine.model';

export const GetListAstramagazineFailed = createAction(
  'Services.Menu.Astramagazine.Events.GetListAstramagazineFailed',
  props<{
    response: DataResponsePagination<AstramagazineModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetListAstramagazineFailedActionReducer = on(
  GetListAstramagazineFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,

      [dataType]: {
        ...state?.[dataType],
        ...response,
      },
    };
  }
);

export const GetListAstramagazineFailedInteractionActionReducer = on(
  GetListAstramagazineFailed,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        error: response?.message,
        success: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
