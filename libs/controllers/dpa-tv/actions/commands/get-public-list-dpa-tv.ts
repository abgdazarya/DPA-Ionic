import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListDpaTv = createAction(
  'Services.Menu.DpaTv.Commands.GetPublicListDpaTv',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetPublicListDpaTvReset = createAction(
  'Services.Menu.DpaTv.Commands.GetPublicListDpaTvReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetPublicListDpaTvInteractionReset = createAction(
  'Services.Menu.DpaTv.Commands.GetPublicListDpaTvInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetPublicListDpaTvActionReducer = on(
  GetPublicListDpaTv,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListDpaTvActionResetReducer = on(
  GetPublicListDpaTvReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...response,
        data: { data: [] },
      },
    };
  }
);

export const GetPublicListDpaTvInteractionActionReducer = on(
  GetPublicListDpaTv,
  (state: any, { dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetPublicListDpaTvInteractionActionResetReducer = on(
  GetPublicListDpaTvInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      [dataType]: {
        ...state?.[dataType],
        ...response,
      },
    };
  }
);
