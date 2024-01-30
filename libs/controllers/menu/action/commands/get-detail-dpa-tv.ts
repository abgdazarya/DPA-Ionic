import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailDpaTv = createAction(
  'Services.Menu.Commands.GetDetailDpaTv',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailDpaTvReset = createAction(
  'Services.Menu.Commands.GetDetailDpaTvReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailDpaTvInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailDpaTvInteractionReset',
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
      dpaTv: {
        ...state?.dpaTv,
        detail: {
          ...state?.dpaTv?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailDpaTvInteractionActionReducer = on(
  GetDetailDpaTv,
  (state: any, {}) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        detail: {
          ...state?.dpaTv?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailDpaTvInteractionActionResetReducer = on(
  GetDetailDpaTvInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        detail: {
          ...state?.dpaTv?.detail,
          ...response,
        },
      },
    };
  }
);
