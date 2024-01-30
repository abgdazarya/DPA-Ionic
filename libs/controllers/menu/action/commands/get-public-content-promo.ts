import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicContentPromo = createAction(
  'Services.Menu.Commands.GetPublicContentPromo',
  props<{ payload: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetPublicContentPromoReset = createAction(
  'Services.Menu.Commands.GetPublicContentPromoReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetPublicContentPromoInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicContentPromoInteractionReset',
  props<{ response: any; dataType: 'landing' | 'list'; async?: boolean }>()
);

export const GetPublicContentPromoActionReducer = on(
  GetPublicContentPromo,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicContentPromoActionResetReducer = on(
  GetPublicContentPromoReset,
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

export const GetPublicContentPromoInteractionActionReducer = on(
  GetPublicContentPromo,
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

export const GetPublicContentPromoInteractionActionResetReducer = on(
  GetPublicContentPromoInteractionReset,
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
