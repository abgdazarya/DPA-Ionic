import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetListAstramagazine = createAction(
  'Services.Menu.Astramagazine.Commands.GetListAstramagazine',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListAstramagazineReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetListAstramagazineReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListAstramagazineInteractionReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetListAstramagazineInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetListAstramagazineActionReducer = on(
  GetListAstramagazine,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetListAstramagazineActionResetReducer = on(
  GetListAstramagazineReset,
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

export const GetListAstramagazineInteractionActionReducer = on(
  GetListAstramagazine,
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

export const GetListAstramagazineInteractionActionResetReducer = on(
  GetListAstramagazineInteractionReset,
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
