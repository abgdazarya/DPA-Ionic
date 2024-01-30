import { BaseProfile } from '@controllers/profile';
import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';

export const SaveCustomerConcernSucceed = createAction(
  'Services.Home.Events.SaveCustomerConcernSucceed',
  props<{ response: DataResponse<BaseProfile> }>()
);

export const SaveCustomerConcernSucceedActionReducer = on(
  SaveCustomerConcernSucceed,
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

export const SaveCustomerConcernSucceedInteractionActionReducer = on(
  SaveCustomerConcernSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      customerConcern: {
        ...state?.customerConcern,
        main: {
          ...state?.customerConcern?.main,
          error: null,
          success: message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
