import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailContentPromo = createAction(
  'Services.Menu.Commands.GetDetailContentPromo',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailContentPromoReset = createAction(
  'Services.Menu.Commands.GetDetailContentPromoReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailContentPromoInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailContentPromoInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailContentPromoActionReducer = on(
  GetDetailContentPromo,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailContentPromoActionResetReducer = on(
  GetDetailContentPromoReset,
  (state: any, { response }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        detail: {
          ...state?.contentPromo?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailContentPromoInteractionActionReducer = on(
  GetDetailContentPromo,
  (state: any, {}) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        detail: {
          ...state?.contentPromo?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailContentPromoInteractionActionResetReducer = on(
  GetDetailContentPromoInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      contentPromo: {
        ...state?.contentPromo,
        detail: {
          ...state?.contentPromo?.detail,
          ...response,
        },
      },
    };
  }
);
