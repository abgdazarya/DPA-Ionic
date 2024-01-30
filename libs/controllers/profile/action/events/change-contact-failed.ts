import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { ChangeContactData } from '../../models/change-contact';

export const ChangeContactFailed = createAction(
  'Services.Auth.Events.ChangeContactFailed',
  props<{ response: DataResponse<ChangeContactData> }>()
);

export const ChangeContactFailedActionReducer = on(
  ChangeContactFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const ChangeContactFailedInteractionActionReducer = on(
  ChangeContactFailed,
  (state: any, { response }) => {
    return {
      ...state,
      changeContact: {
        ...state?.changeContact,
        main: {
          ...state?.changeContact?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: true,
        },
      },
    };
  }
);
