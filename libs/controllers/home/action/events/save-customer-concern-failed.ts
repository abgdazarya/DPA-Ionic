import { BaseProfile } from '@controllers/profile';
import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';

export const SaveCustomerConcernFailed = createAction(
  'Services.Home.Events.SaveCustomerConcernFailed',
  props<{ response: DataResponse<BaseProfile> }>()
);

export const SaveCustomerConcernFailedActionReducer = on(
  SaveCustomerConcernFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const SaveCustomerConcernFailedInteractionActionReducer = on(
  SaveCustomerConcernFailed,
  (state: any, { response }) => {
    return {
      ...state,
      customerConcern: {
        ...state?.customerConcern,
        main: {
          ...state?.customerConcern?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
