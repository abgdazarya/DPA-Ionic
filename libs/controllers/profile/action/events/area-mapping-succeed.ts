import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { AreaMappingData } from '../../models/area-mapping.model';

export const AreaMappingSucceed = createAction(
  'Services.Profile.Events.GetAreaMappingSucceed',
  props<{ response: DataResponseArray<AreaMappingData>; key?: string }>()
);

export const AreaMappingSucceedActionReducer = on(
  AreaMappingSucceed,
  (state: any, { response, key = 'provinsi' }) => {
    return {
      ...state,
      areaMapping: {
        ...state?.areaMapping,
        [key]: response?.data,
      },
    };
  }
);

export const AreaMappingSucceedInteractionActionReducer = on(
  AreaMappingSucceed,
  (state: any, { response, key = '' }) => {
    return {
      ...state,
      areaMapping: {
        ...state?.areaMapping,
        code: response.code,
        success: response.message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
