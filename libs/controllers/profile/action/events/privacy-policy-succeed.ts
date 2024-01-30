import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PrivacyData } from '../../models/privacy';

export const PrivacyPolicySucceed = createAction(
  'Services.Profile.Events.GetPrivacyPolicySucceed',
  props<{ response: DataResponse<PrivacyData[]> }>()
);

export const PrivacyPolicySucceedActionReducer = on(
  PrivacyPolicySucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      privacyPolicy: {
        ...state?.privacyPolicy,
        data,
      },
    };
  }
);

export const PrivacyPolicySucceedInteractionActionReducer = on(
  PrivacyPolicySucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      privacyPolicy: {
        ...state?.privacyPolicy,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
