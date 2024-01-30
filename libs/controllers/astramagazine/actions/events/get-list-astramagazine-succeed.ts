import { createAction, on, props } from '@ngrx/store';
import { DataResponsePagination, InteractionType } from '@shared';
import { AstramagazineModel } from '../../models/astramagazine.model';

export const GetListAstramagazineSucceed = createAction(
  'Services.Menu.Astramagazine.Events.GetListAstramagazineSucceed',
  props<{
    response: DataResponsePagination<AstramagazineModel>;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
  }>()
);

export const GetListAstramagazineSucceedActionReducer = on(
  GetListAstramagazineSucceed,
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

export const GetListAstramagazineSucceedInteractionActionReducer = on(
  GetListAstramagazineSucceed,
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
