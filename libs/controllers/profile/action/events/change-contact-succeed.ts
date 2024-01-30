import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ChangeContactData } from '../../models/change-contact';

export const ChangeContactSucceed = createAction(
  'Services.Auth.Events.ChangeContactSucceed',
  props<{ response: DataResponse<ChangeContactData> }>()
);

export const ChangeContactSucceedActionReducer = on(
  ChangeContactSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      changeContact: {
        ...state?.changeContact,
        main: {
          ...state?.changeContact?.main,
          ...response,
        },
      },
    };
  }
);

export const ChangeContactSucceedInteractionActionReducer = on(
  ChangeContactSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      changeContact: {
        ...state?.changeContact,
        main: {
          ...state?.changeContact?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: true,
        },
      },
    };
  }
);
