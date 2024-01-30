import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { AreaMappingData } from '../../models/area-mapping.model';

export const AreaMappingFailed = createAction(
  'Services.Profile.Events.GetAreaMappingFailed',
  props<{ response: DataResponseArray<AreaMappingData>; key?: string }>()
);

export const AreaMappingFailedActionReducer = on(
  AreaMappingFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const AreaMappingFailedInteractionActionReducer = on(
  AreaMappingFailed,
  (state: any) => {
    return {
      ...state,
      areaMapping: {
        ...state?.areaMapping,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
