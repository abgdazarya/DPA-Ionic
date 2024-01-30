import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPopupBirthdayResign = createAction(
  'Services.Home.Commands.GetPopupBirthdayResign',
  props<{ payload: any; async?: boolean }>()
);

export const GetPopupBirthdayResignReset = createAction(
  'Services.Home.Commands.GetPopupBirthdayResignReset',
  props<{ response: any; async?: boolean }>()
);

export const GetPopupBirthdayResignInteractionReset = createAction(
  'Services.Home.Commands.GetPopupBirthdayResignInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetPopupBirthdayResignActionReducer = on(
  GetPopupBirthdayResign,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPopupBirthdayResignActionResetReducer = on(
  GetPopupBirthdayResignReset,
  (state: any, { response }) => {
    return {
      ...state,
      birthdayPopup: {
        ...state?.birthdayPopup,
        main: {
          ...state?.birthdayPopup?.main,
          ...response,
        },
      },
    };
  }
);

export const GetPopupBirthdayResignInteractionActionReducer = on(
  GetPopupBirthdayResign,
  (state: any) => {
    return {
      ...state,
      birthdayPopup: {
        ...state?.birthdayPopup,
        main: {
          ...state?.birthdayPopup?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetPopupBirthdayResignInteractionActionResetReducer = on(
  GetPopupBirthdayResignInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      birthdayPopup: {
        ...state?.birthdayPopup,
        main: {
          ...state?.birthdayPopup?.main,
          ...response,
        },
      },
    };
  }
);
