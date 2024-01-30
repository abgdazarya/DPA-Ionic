import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetNews = createAction(
  'Services.Menu.Commands.GetNews',
  props<{
    payload: MenuDto;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetNewsReset = createAction(
  'Services.Menu.Commands.GetNewsReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetNewsInteractionReset = createAction(
  'Services.Menu.Commands.GetNewsInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetNewsActionReducer = on(GetNews, (state: any, { dataType }) => {
  return {
    ...state,
  };
});

export const GetNewsActionResetReducer = on(
  GetNewsReset,
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

export const GetNewsInteractionActionReducer = on(
  GetNews,
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

export const GetNewsInteractionActionResetReducer = on(
  GetNewsInteractionReset,
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
