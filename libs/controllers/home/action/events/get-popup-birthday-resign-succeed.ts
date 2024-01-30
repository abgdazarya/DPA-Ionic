import { createAction, on, props } from '@ngrx/store';
import { DataResponse, DataResponseArray, InteractionType } from '@shared';
import { Popup } from '../../models/popup.model';

export const GetPopupBirthdayResignSucceed = createAction(
  'Services.Auth.Events.GetPopupBirthdayResignSucceed',
  props<{ response: DataResponseArray<Popup> }>()
);

export const GetPopupBirthdayResignSucceedActionReducer = on(
  GetPopupBirthdayResignSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      birthdayPopup: {
        ...state?.birthdayPopup,
        main: {
          ...state?.birthdayPopup?.main,
          ...response,
        },
      },
    };
  }
);

export const GetPopupBirthdayResignSucceedInteractionActionReducer = on(
  GetPopupBirthdayResignSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      birthdayPopup: {
        ...state?.birthdayPopup,
        main: {
          ...state?.birthdayPopup?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
