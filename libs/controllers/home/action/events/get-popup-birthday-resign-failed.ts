import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { Popup } from '../../models/popup.model';

export const GetPopupBirthdayResignFailed = createAction(
  'Services.Auth.Events.GetPopupBirthdayResignFailed',
  props<{ response: DataResponse<Popup> }>()
);

export const GetPopupBirthdayResignFailedActionReducer = on(
  GetPopupBirthdayResignFailed,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPopupBirthdayResignFailedInteractionActionReducer = on(
  GetPopupBirthdayResignFailed,
  (state: any, { response }) => {
    return {
      ...state,
      birthdayPopup: {
        ...state?.birthdayPopup,
        main: {
          ...state?.birthdayPopup?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
