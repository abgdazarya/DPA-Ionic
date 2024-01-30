import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { AreaMappingDto } from '../../dtos/area-maping.dto';

export const AreaMapping = createAction(
  'Services.Profile.Commands.GetAreaMapping',
  props<{ payload: AreaMappingDto; key?: string; async?: boolean }>()
);

export const AreaMappingActionReducer = on(AreaMapping, (state: any) => {
  return {
    ...state,
  };
});

export const AreaMappingInteractionActionReducer = on(
  AreaMapping,
  (state: any) => {
    return {
      ...state,
      areaMapping: {
        ...state?.areaMapping,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
