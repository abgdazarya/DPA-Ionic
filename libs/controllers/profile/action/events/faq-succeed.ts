import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { FaqData } from '../../models/faq';

export const FaqSucceed = createAction(
  'Services.Profile.Events.GetFaqSucceed',
  props<{ response: DataResponse<FaqData[]> }>()
);

export const FaqSucceedActionReducer = on(
  FaqSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      faq: {
        ...state?.faq,
        data,
      },
    };
  }
);

export const FaqSucceedInteractionActionReducer = on(
  FaqSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      faq: {
        ...state?.faq,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
