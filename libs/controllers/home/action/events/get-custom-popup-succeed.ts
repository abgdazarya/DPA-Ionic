import { createAction, on, props } from '@ngrx/store';
import { DataResponseArray, InteractionType } from '@shared';
import { Popup } from '../../models/popup.model';

export const GetCustomPopupSucceed = createAction(
  'Services.Auth.Events.GetCustomPopupSucceed',
  props<{ response: DataResponseArray<Popup> }>()
);

export const GetCustomPopupSucceedActionReducer = on(
  GetCustomPopupSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      customPopup: {
        ...state?.customPopup,
        main: {
          ...state?.customPopup?.main,
          ...response,
        },
      },
    };
  }
);

export const GetCustomPopupSucceedInteractionActionReducer = on(
  GetCustomPopupSucceed,
  (state: any, { response }) => {
    return {
      ...state,
      customPopup: {
        ...state?.customPopup,
        main: {
          ...state?.customPopup?.main,
          error: null,
          success: response?.message,
          type: InteractionType.SUCCEED,
          isLoading: false,
        },
      },
    };
  }
);
