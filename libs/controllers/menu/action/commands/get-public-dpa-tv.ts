import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicDpaTv = createAction(
  'Services.Menu.Commands.GetPublicDpaTv',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetPublicDpaTvReset = createAction(
  'Services.Menu.Commands.GetPublicDpaTvReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetPublicDpaTvInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicDpaTvInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetPublicDpaTvActionReducer = on(
  GetPublicDpaTv,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicDpaTvActionResetReducer = on(
  GetPublicDpaTvReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        [dataType]: {
          ...state?.dpaTv?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetPublicDpaTvInteractionActionReducer = on(
  GetPublicDpaTv,
  (state: any, { dataType }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        [dataType]: {
          ...state?.dpaTv?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetPublicDpaTvInteractionActionResetReducer = on(
  GetPublicDpaTvInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      dpaTv: {
        ...state?.dpaTv,
        [dataType]: {
          ...state?.dpaTv?.[dataType],
          ...response,
        },
      },
    };
  }
);
