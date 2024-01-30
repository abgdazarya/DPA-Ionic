import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetListJob = createAction(
  'Services.Menu.Job.Commands.GetListJob',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'recommendation';
    async?: boolean;
  }>()
);

export const GetListJobReset = createAction(
  'Services.Menu.Job.Commands.GetListJobReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'recommendation';
    async?: boolean;
  }>()
);

export const GetListJobInteractionReset = createAction(
  'Services.Menu.Job.Commands.GetListJobInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'recommendation';
    async?: boolean;
  }>()
);

export const GetListJobActionReducer = on(
  GetListJob,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListJobActionResetReducer = on(
  GetListJobReset,
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

export const GetListJobInteractionActionReducer = on(
  GetListJob,
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

export const GetListJobInteractionActionResetReducer = on(
  GetListJobInteractionReset,
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
