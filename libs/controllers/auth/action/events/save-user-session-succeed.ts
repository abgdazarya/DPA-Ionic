import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { SaveUserSessionData } from '../../models/save-user-session-data';

export const SaveUserSessionSucceed = createAction(
  'Services.Auth.Events.SaveUserSessionSucceed',
  props<{ response: DataResponse<SaveUserSessionData> }>()
);

export const SaveUserSessionSucceedActionReducer = on(
  SaveUserSessionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      SaveUserSession: {
        ...state?.SaveUserSession,
        main: {
          ...state?.SaveUserSession?.main,
          ...response,
        },
      },
    };
  }
);

export const SaveUserSessionSucceedInteractionActionReducer = on(
  SaveUserSessionSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      SaveUserSession: {
        ...state?.SaveUserSession,
        main: {
          ...state?.SaveUserSession?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
