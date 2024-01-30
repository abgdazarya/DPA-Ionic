import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { RateDto } from '../../dtos/rate.dto';

export const RateReview = createAction(
  'Services.Profile.Commands.RateReview',
  props<{ payload: RateDto; async?: boolean }>()
);

export const RateReviewActionReducer = on(RateReview, (state: any) => {
  return {
    ...state,
  };
});

export const RateReviewInteractionActionReducer = on(RateReview, (state: any) => {
  return {
    ...state,
   rateReview: {
      ...state?.rateReview,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});
