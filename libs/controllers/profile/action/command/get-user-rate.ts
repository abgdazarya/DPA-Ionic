import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { UserRateDto } from '../../dtos/rate.dto';

export const GetUserRate = createAction(
  'Services.Profile.Commands.GetUserRate',
  props<{ payload: UserRateDto; async?: boolean }>()
);

export const GetUserRateReset = createAction(
  'Services.Profile.Commands.GetUserRateReset',
  props<{ response: any; async?: boolean }>()
);

export const GetUserRateInteractionReset = createAction(
  'Services.Profile.Commands.GetUserRateInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetUserRateActionReducer = on(GetUserRate, (state: any) => {
  return {
    ...state,
  };
});

export const GetUserRateActionResetReducer = on(
  GetUserRateReset,
  (state: any, { response }) => {
    return {
      ...state,
      userRate: {
        ...state?.userRate,
        main: {
          ...state?.userRate?.main,
          ...response,
        },
      },
    };
  }
);

export const GetUserRateInteractionActionReducer = on(GetUserRate, (state: any) => {
  return {
    ...state,
    userRate: {
      ...state?.userRate,
      main: {
        ...state?.userRate?.main,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    },
  };
});

export const GetUserRateInteractionActionResetReducer = on(
  GetUserRateInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      userRate: {
        ...state?.userRate,
        main: {
          ...state?.userRate?.main,
          ...response,
        },
      },
    };
  }
);
