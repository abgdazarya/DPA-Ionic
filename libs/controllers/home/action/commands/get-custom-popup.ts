import { createAction, on, props } from '@ngrx/store';
import { DATA_RESPONSE_INITIAL_STATE, InteractionType } from '@shared';

export const GetCustomPopup = createAction(
  'Services.Home.Commands.GetCustomPopup',
  props<{ payload: any; async?: boolean }>()
);

export const GetCustomPopupReset = createAction(
  'Services.Home.Commands.GetCustomPopupReset',
  props<{ response: any; async?: boolean }>()
);

export const GetCustomPopupInteractionReset = createAction(
  'Services.Home.Commands.GetCustomPopupInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetCustomPopupActionReducer = on(GetCustomPopup, (state: any) => {
  return {
    ...state,
  };
});

export const GetCustomPopupActionResetReducer = on(
  GetCustomPopupReset,
  (state: any, { response }) => {
    return {
      ...state,
      customPopup: {
        ...state?.customPopup,
        main: {
          ...state?.customPopup?.main,
          ...response,
        },
      },
    };
  }
);

export const GetCustomPopupInteractionActionReducer = on(
  GetCustomPopup,
  (state: any) => {
    return {
      ...state,
      customPopup: {
        ...state?.customPopup,
        main: {
          ...state?.customPopup?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetCustomPopupInteractionActionResetReducer = on(
  GetCustomPopupInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      customPopup: {
        ...state?.customPopup,
        main: {
          ...state?.customPopup?.main,
          ...response,
        },
      },
    };
  }
);
