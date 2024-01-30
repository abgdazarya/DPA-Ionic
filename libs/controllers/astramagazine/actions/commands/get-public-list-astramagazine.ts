import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListAstramagazine = createAction(
  'Services.Menu.Astramagazine.Commands.GetPublicListAstramagazine',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListAstramagazineReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetPublicListAstramagazineReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListAstramagazineInteractionReset = createAction(
  'Services.Menu.Astramagazine.Commands.GetPublicListAstramagazineInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest';
    async?: boolean;
  }>()
);

export const GetPublicListAstramagazineActionReducer = on(
  GetPublicListAstramagazine,
  (state: any, { dataType }) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListAstramagazineActionResetReducer = on(
  GetPublicListAstramagazineReset,
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

export const GetPublicListAstramagazineInteractionActionReducer = on(
  GetPublicListAstramagazine,
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

export const GetPublicListAstramagazineInteractionActionResetReducer = on(
  GetPublicListAstramagazineInteractionReset,
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
