import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetAstraMagazine = createAction(
  'Services.Menu.Commands.GetAstraMagazine',
  props<{ payload: MenuDto; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetAstraMagazineReset = createAction(
  'Services.Menu.Commands.GetAstraMagazineReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetAstraMagazineInteractionReset = createAction(
  'Services.Menu.Commands.GetAstraMagazineInteractionReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetAstraMagazineActionReducer = on(
  GetAstraMagazine,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetAstraMagazineActionResetReducer = on(
  GetAstraMagazineReset,
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

export const GetAstraMagazineInteractionActionReducer = on(
  GetAstraMagazine,
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

export const GetAstraMagazineInteractionActionResetReducer = on(
  GetAstraMagazineInteractionReset,
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
