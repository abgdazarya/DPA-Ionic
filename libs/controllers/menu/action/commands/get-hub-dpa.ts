import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetHubDpa = createAction(
  'Services.Menu.Commands.GetHubDpa',
  props<{ payload: any; async?: boolean }>()
);

export const GetHubDpaReset = createAction(
  'Services.Menu.Commands.GetHubDpaReset',
  props<{ response: any; async?: boolean }>()
);

export const GetHubDpaInteractionReset = createAction(
  'Services.Menu.Commands.GetHubDpaInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetHubDpaActionReducer = on(GetHubDpa, (state: any) => {
  return {
    ...state,
  };
});

export const GetHubDpaActionResetReducer = on(
  GetHubDpaReset,
  (state: any, { response }) => {
    return {
      ...state,
      hubDpa: {
        ...state?.hubDpa,
        main: {
          ...state?.hubDpa?.main,
          ...response,
        },
      },
    };
  }
);

export const GetHubDpaInteractionActionReducer = on(GetHubDpa, (state: any) => {
  return {
    ...state,
    hubDpa: {
      ...state?.hubDpa,
      main: {
        ...state?.hubDpa?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const GetHubDpaInteractionActionResetReducer = on(
  GetHubDpaInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      hubDpa: {
        ...state?.hubDpa,
        main: {
          ...state?.hubDpa?.main,
          ...response,
        },
      },
    };
  }
);
