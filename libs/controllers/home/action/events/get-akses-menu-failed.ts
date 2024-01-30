import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { Popup } from '../../models/popup.model';

export const GetAksesMenuFailed = createAction(
  'Services.Auth.Events.GetAksesMenuFailed',
  props<{ response: DataResponse<Popup> }>()
);

export const GetAksesMenuFailedActionReducer = on(
  GetAksesMenuFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetAksesMenuFailedInteractionActionReducer = on(
  GetAksesMenuFailed,
  (state: any, { response }) => {
    return {
      ...state,
      aksesMenu: {
        ...state?.aksesMenu,
        main: {
          ...state?.aksesMenu?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
