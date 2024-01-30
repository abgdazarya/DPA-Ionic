import { INITIAL_STATE, createAction, on, props } from '@ngrx/store';
import { INITIAL_INTERACTION_STATE, InteractionType } from '@shared';
import { SaveUserSessionDto } from '../../dtos/save-user-session.dto';

export const SaveUserSession = createAction(
  'Services.Auth.Commands.SaveUserSession',
  props<{ payload: SaveUserSessionDto; async?: boolean }>()
);

export const SaveUserSessionReset = createAction(
  'Services.Auth.Commands.SaveUserSessionReset',
  props<{ response: any; async?: boolean }>()
);

export const SaveUserSessionInteractionReset = createAction(
  'Services.Auth.Commands.SaveUserSessionInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const SaveUserSessionActionReducer = on(
  SaveUserSession,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const SaveUserSessionActionResetReducer = on(
  SaveUserSessionReset,
  (state: any, { response }) => {
    return {
      ...state,
      SaveUserSession: {
        ...state?.SaveUserSession,
        ...INITIAL_STATE,
        main: {
          ...INITIAL_STATE,
          ...response,
        },
      },
    };
  }
);

export const SaveUserSessionInteractionActionReducer = on(
  SaveUserSession,
  (state: any) => {
    return {
      ...state,
      SaveUserSession: {
        ...state?.SaveUserSession,
        type: InteractionType.PROCESS,
        isLoading: true,
        error: null,
        success: null,
        main: {
          ...state?.SaveUserSession?.main,
          type: InteractionType.PROCESS,
          isLoading: true,
          error: null,
          success: null,
        },
      },
    };
  }
);

export const SaveUserSessionInteractionActionResetReducer = on(
  SaveUserSessionInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      SaveUserSession: {
        ...INITIAL_INTERACTION_STATE,
        main: {
          ...INITIAL_INTERACTION_STATE,
          ...response,
        },
      },
    };
  }
);
