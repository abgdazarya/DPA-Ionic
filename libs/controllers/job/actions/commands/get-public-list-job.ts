import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListJob = createAction(
  'Services.Menu.Job.Commands.GetPublicListJob',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListJobReset = createAction(
  'Services.Menu.Job.Commands.GetPublicListJobReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListJobInteractionReset = createAction(
  'Services.Menu.Job.Commands.GetPublicListJobInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListJobActionReducer = on(
  GetPublicListJob,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListJobActionResetReducer = on(
  GetPublicListJobReset,
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

export const GetPublicListJobInteractionActionReducer = on(
  GetPublicListJob,
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

export const GetPublicListJobInteractionActionResetReducer = on(
  GetPublicListJobInteractionReset,
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
