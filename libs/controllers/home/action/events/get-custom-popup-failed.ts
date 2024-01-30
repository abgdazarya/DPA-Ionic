import { createAction, on, props } from '@ngrx/store';
import {
  DATA_RESPONSE_INITIAL_STATE_FAILED,
  DataResponseArray,
  InteractionType,
} from '@shared';
import { Popup } from '../../models/popup.model';

export const GetCustomPopupFailed = createAction(
  'Services.Auth.Events.GetCustomPopupFailed',
  props<{ response: DataResponseArray<Popup> }>()
);

export const GetCustomPopupFailedActionReducer = on(
  GetCustomPopupFailed,
  (state: any) => {
    return {
      ...state,
      // customPopup: {
      //   ...state?.customPopup,
      //   main: DATA_RESPONSE_INITIAL_STATE_FAILED,
      // },
    };
  }
);

export const GetCustomPopupFailedInteractionActionReducer = on(
  GetCustomPopupFailed,
  (state: any, { response }) => {
    return {
      ...state,
      customPopup: {
        ...state?.customPopup,
        main: {
          ...state?.customPopup?.main,
          error: response?.message,
          success: null,
          type: InteractionType.FAILED,
          isLoading: false,
        },
      },
    };
  }
);
