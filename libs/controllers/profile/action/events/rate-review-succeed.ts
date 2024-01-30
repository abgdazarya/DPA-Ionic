import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { RateData } from '../../models/rate';

export const RateReviewSucceed = createAction(
  'Services.Profile.Events.RateReviewSucceed',
  props<{ response: DataResponse<RateData> }>()
);

export const RateReviewSucceedActionReducer = on(
  RateReviewSucceed,
  (state: any, { response: { data } }) => {
    return {
      ...state,
      rateReview: {
        ...state?.rateReview,
        data,
      },
    };
  }
);

export const RateReviewSucceedInteractionActionReducer = on(
  RateReviewSucceed,
  (state: any, { response: { code, message } }) => {
    return {
      ...state,
      rateReview: {
        ...state?.rateReview,
        code,
        success: message,
        error: null,
        type: InteractionType.SUCCEED,
        isLoading: false,
      },
    };
  }
);
