import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailAstramagazine = createAction(
  'Services.Menu.Astramagazine.Commands.GetDetailAstramagazine',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailAstramagazineReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetDetailAstramagazineReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailAstramagazineInteractionReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetDetailAstramagazineInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailAstramagazineActionReducer = on(
  GetDetailAstramagazine,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailAstramagazineActionResetReducer = on(
  GetDetailAstramagazineReset,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailAstramagazineInteractionActionReducer = on(
  GetDetailAstramagazine,
  (state: any, {}) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetDetailAstramagazineInteractionActionResetReducer = on(
  GetDetailAstramagazineInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);
