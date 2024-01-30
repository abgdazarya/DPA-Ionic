import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const SaveCustomerConcern = createAction(
  'Services.Home.Commands.SaveCustomerConcern',
  props<{ payload: any; async?: boolean }>()
);

export const SaveCustomerConcernReset = createAction(
  'Services.Home.Commands.SaveCustomerConcernReset',
  props<{ response: any; async?: boolean }>()
);

export const SaveCustomerConcernInteractionReset = createAction(
  'Services.Home.Commands.SaveCustomerConcernInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const SaveCustomerConcernActionReducer = on(
  SaveCustomerConcern,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const SaveCustomerConcernActionResetReducer = on(
  SaveCustomerConcernReset,
  (state: any, { response }) => {
    return {
      ...state,
      customerConcern: {
        ...state?.customerConcern,
        main: {
          ...state?.customerConcern?.main,
          ...response,
        },
      },
    };
  }
);

export const SaveCustomerConcernInteractionActionReducer = on(
  SaveCustomerConcern,
  (state: any) => {
    return {
      ...state,
      customerConcern: {
        ...state?.customerConcern,
        main: {
          ...state?.customerConcern?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const SaveCustomerConcernInteractionActionResetReducer = on(
  SaveCustomerConcernInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      customerConcern: {
        ...state?.customerConcern,
        main: {
          ...state?.customerConcern?.main,
          ...response,
        },
      },
    };
  }
);
