import { createAction, on, props } from '@ngrx/store';
import { DataResponse, InteractionType } from '@shared';
import { RateData } from '../../models/rate';

export const RateReviewFailed = createAction(
  'Services.Profile.Events.RateReviewFailed',
  props<{ response: DataResponse<RateData> }>()
);

export const RateReviewFailedActionReducer = on(RateReviewFailed, (state: any) => {
  return {
    ...state,
  };
});

export const RateReviewFailedInteractionActionReducer = on(
  RateReviewFailed,
  (state: any) => {
    return {
      ...state,
      rateReview: {
        ...state?.rateReview,
        code: null,
        success: null,
        error: null,
        type: InteractionType.FAILED,
        isLoading: false,
      },
    };
  }
);
