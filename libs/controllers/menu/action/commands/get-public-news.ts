import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicNews = createAction(
  'Services.Menu.Commands.GetPublicNews',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicNewsReset = createAction(
  'Services.Menu.Commands.GetPublicNewsReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicNewsInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicNewsInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicNewsActionReducer = on(
  GetPublicNews,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicNewsActionResetReducer = on(
  GetPublicNewsReset,
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

export const GetPublicNewsInteractionActionReducer = on(
  GetPublicNews,
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

export const GetPublicNewsInteractionActionResetReducer = on(
  GetPublicNewsInteractionReset,
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
