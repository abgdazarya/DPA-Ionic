import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { PrivacyData } from '../../models/privacy';

export const PrivacyPolicyFailed = createAction(
  'Services.Profile.Events.GetPrivacyPolicyFailed',
  props<{ response: DataResponse<PrivacyData[]> }>()
);

export const PrivacyPolicyFailedActionReducer = on(PrivacyPolicyFailed, (state: any) => {
  return {
    ...state,
  };
});

export const PrivacyPolicyFailedInteractionActionReducer = on(
  PrivacyPolicyFailed,
  (state: any) => {
    return {
      ...state,
      privacyPolicy: {
        ...state?.privacyPolicy,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
