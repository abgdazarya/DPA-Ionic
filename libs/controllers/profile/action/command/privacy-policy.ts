import { createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { InteractionType } from '@shared';
import { FaqDto } from '../../dtos/faq.dto';

export const PrivacyPolicy = createAction(
  'Services.Profile.Commands.GetPrivacyPolicy',
  props<{ async?: boolean }>()
);

export const PrivacyPolicyActionReducer = on(PrivacyPolicy, (state: any) => {
  return {
    ...state,
  };
});

export const PrivacyPolicyInteractionActionReducer = on(
  PrivacyPolicy,
  (state: any) => {
    return {
      ...state,
      privacyPolicy: {
        ...state?.privacyPolicy,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);
