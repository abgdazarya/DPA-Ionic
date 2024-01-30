import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListJob = createAction(
  'Services.Menu.Commands.GetPublicListJob',
  props<{
    payload: any;
    dataType: 'landing' | 'list';
    async?: boolean;
  }>()
);

export const GetPublicListJobReset = createAction(
  'Services.Menu.Commands.GetPublicListJobReset',
  props<{
    response: any;
    dataType: 'landing' | 'list';
    async?: boolean;
  }>()
);

export const GetPublicListJobInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicListJobInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list';
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
      news: {
        ...state?.news,
        [dataType]: {
          ...state?.news?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetPublicListJobInteractionActionReducer = on(
  GetPublicListJob,
  (state: any, { dataType }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        [dataType]: {
          ...state?.news?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetPublicListJobInteractionActionResetReducer = on(
  GetPublicListJobInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      news: {
        ...state?.news,
        [dataType]: {
          ...state?.news?.[dataType],
          ...response,
        },
      },
    };
  }
);
