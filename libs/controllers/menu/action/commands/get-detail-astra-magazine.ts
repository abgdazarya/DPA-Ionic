import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailAstraMagazine = createAction(
  'Services.Menu.Commands.GetDetailAstraMagazine',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailAstraMagazineReset = createAction(
  'Services.Menu.Commands.GetDetailAstraMagazineReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailAstraMagazineInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailAstraMagazineInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailAstraMagazineActionReducer = on(
  GetDetailAstraMagazine,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailAstraMagazineActionResetReducer = on(
  GetDetailAstraMagazineReset,
  (state: any, { response }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        detail: {
          ...state?.astraMagazine?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailAstraMagazineInteractionActionReducer = on(
  GetDetailAstraMagazine,
  (state: any, {}) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        detail: {
          ...state?.astraMagazine?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailAstraMagazineInteractionActionResetReducer = on(
  GetDetailAstraMagazineInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        detail: {
          ...state?.astraMagazine?.detail,
          ...response,
        },
      },
    };
  }
);
