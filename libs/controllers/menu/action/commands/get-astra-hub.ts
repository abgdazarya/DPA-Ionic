import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetAstraHub = createAction(
  'Services.Auth.Commands.GetAstraHub',
  props<{ async?: boolean }>()
);

export const GetAstraHubReset = createAction(
  'Services.Auth.Commands.GetAstraHubReset',
  props<{ response: any; async?: boolean }>()
);

export const GetAstraHubInteractionReset = createAction(
  'Services.Auth.Commands.GetAstraHubInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetAstraHubActionReducer = on(GetAstraHub, (state: any) => {
  return {
    ...state,
  };
});

export const GetAstraHubActionResetReducer = on(
  GetAstraHubReset,
  (state: any, { response }) => {
    return {
      ...state,
      astraHub: {
        ...state?.astraHub,
        main: {
          ...state?.astraHub?.main,
          ...response,
        },
      },
    };
  }
);

export const GetAstraHubInteractionActionReducer = on(
  GetAstraHub,
  (state: any) => {
    return {
      ...state,
      astraHub: {
        ...state?.astraHub,
        main: {
          ...state?.astraHub?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetAstraHubInteractionActionResetReducer = on(
  GetAstraHubInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      astraHub: {
        ...state?.astraHub,
        main: {
          ...state?.astraHub?.main,
          ...response,
        },
      },
    };
  }
);
