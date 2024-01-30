import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetContentPromo = createAction(
  'Services.Menu.Commands.GetContentPromo',
  props<{ payload: MenuDto; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetContentPromoReset = createAction(
  'Services.Menu.Commands.GetContentPromoReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetContentPromoInteractionReset = createAction(
  'Services.Menu.Commands.GetContentPromoInteractionReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetContentPromoActionReducer = on(
  GetContentPromo,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetContentPromoActionResetReducer = on(
  GetContentPromoReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        [dataType]: {
          ...state?.contentPromo?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetContentPromoInteractionActionReducer = on(
  GetContentPromo,
  (state: any, { dataType }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        [dataType]: {
          ...state?.contentPromo?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetContentPromoInteractionActionResetReducer = on(
  GetContentPromoInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        [dataType]: {
          ...state?.contentPromo?.[dataType],
          ...response,
        },
      },
    };
  }
);
