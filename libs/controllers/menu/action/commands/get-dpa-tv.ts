import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetDpaTv = createAction(
  'Services.Menu.Commands.GetDpaTv',
  props<{
    payload: MenuDto;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetDpaTvReset = createAction(
  'Services.Menu.Commands.GetDpaTvReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetDpaTvInteractionReset = createAction(
  'Services.Menu.Commands.GetDpaTvInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetDpaTvActionReducer = on(
  GetDpaTv,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetDpaTvActionResetReducer = on(
  GetDpaTvReset,
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

export const GetDpaTvInteractionActionReducer = on(
  GetDpaTv,
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

export const GetDpaTvInteractionActionResetReducer = on(
  GetDpaTvInteractionReset,
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
