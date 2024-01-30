import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { SaveUserSessionData } from '../../models/save-user-session-data';

export const SaveUserSessionFailed = createAction(
  'Services.Auth.Events.SaveUserSessionFailed',
  props<{ response: DataResponse<SaveUserSessionData> }>()
);

export const SaveUserSessionFailedActionReducer = on(
  SaveUserSessionFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const SaveUserSessionFailedInteractionActionReducer = on(
  SaveUserSessionFailed,
  (state: any, { response }) => {
    return {
      ...state,
      SaveUserSession: {
        ...state?.SaveUserSession,
        main: {
          ...state?.SaveUserSession?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
