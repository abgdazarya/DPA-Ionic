import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetOptionAstramagazine = createAction(
  'Services.Menu.Astramagazine.Commands.GetOptionAstramagazine',
  props<{ payload?: any; async?: boolean }>()
);

export const GetOptionAstramagazineReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetOptionAstramagazineReset',
  props<{ response: any; async?: boolean }>()
);

export const GetOptionAstramagazineInteractionReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetOptionAstramagazineInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetOptionAstramagazineActionReducer = on(
  GetOptionAstramagazine,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetOptionAstramagazineActionResetReducer = on(
  GetOptionAstramagazineReset,
  (state: any, { response }) => {
    return {
      ...state,
      option: {
        ...state?.option,
        ...response,
      },
    };
  }
);

export const GetOptionAstramagazineInteractionActionReducer = on(
  GetOptionAstramagazine,
  (state: any, {}) => {
    return {
      ...state,
      option: {
        ...state?.option,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetOptionAstramagazineInteractionActionResetReducer = on(
  GetOptionAstramagazineInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      option: {
        ...state?.option,
        ...response,
      },
    };
  }
);
