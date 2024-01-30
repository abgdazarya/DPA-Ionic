import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailDpaTv = createAction(
  'Services.Menu.DpaTv.Commands.GetDetailDpaTv',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailDpaTvReset = createAction(
  'Services.Menu.DpaTv.Commands.GetDetailDpaTvReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailDpaTvInteractionReset = createAction(
  'Services.Menu.DpaTv.Commands.GetDetailDpaTvInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailDpaTvActionReducer = on(
  GetDetailDpaTv,
  (state: any, {}) => {
    return {
      ...state,
    };
  }
);

export const GetDetailDpaTvActionResetReducer = on(
  GetDetailDpaTvReset,
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

export const GetDetailDpaTvInteractionActionReducer = on(
  GetDetailDpaTv,
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

export const GetDetailDpaTvInteractionActionResetReducer = on(
  GetDetailDpaTvInteractionReset,
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
