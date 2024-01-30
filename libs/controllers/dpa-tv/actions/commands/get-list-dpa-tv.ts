import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { DpaTvListDto } from '../../dtos/dpatv-list.dto';

export const GetListDpaTv = createAction(
  'Services.Menu.DpaTv.Commands.GetListDpaTv',
  props<{
    payload: DpaTvListDto;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetListDpaTvReset = createAction(
  'Services.Menu.DpaTv.Commands.GetListDpaTvReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetListDpaTvInteractionReset = createAction(
  'Services.Menu.DpaTv.Commands.GetListDpaTvInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer';
    async?: boolean;
  }>()
);

export const GetListDpaTvActionReducer = on(
  GetListDpaTv,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListDpaTvActionResetReducer = on(
  GetListDpaTvReset,
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

export const GetListDpaTvInteractionActionReducer = on(
  GetListDpaTv,
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

export const GetListDpaTvInteractionActionResetReducer = on(
  GetListDpaTvInteractionReset,
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
