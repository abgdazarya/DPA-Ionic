import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicAstraMagazine = createAction(
  'Services.Menu.Commands.GetPublicAstraMagazine',
  props<{ payload: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetPublicAstraMagazineReset = createAction(
  'Services.Menu.Commands.GetPublicAstraMagazineReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetPublicAstraMagazineInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicAstraMagazineInteractionReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetPublicAstraMagazineActionReducer = on(
  GetPublicAstraMagazine,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicAstraMagazineActionResetReducer = on(
  GetPublicAstraMagazineReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        [dataType]: {
          ...state?.astraMagazine?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetPublicAstraMagazineInteractionActionReducer = on(
  GetPublicAstraMagazine,
  (state: any, { dataType }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        [dataType]: {
          ...state?.astraMagazine?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetPublicAstraMagazineInteractionActionResetReducer = on(
  GetPublicAstraMagazineInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      astraMagazine: {
        ...state?.astraMagazine,
        [dataType]: {
          ...state?.astraMagazine?.[dataType],
          ...response,
        },
      },
    };
  }
);
