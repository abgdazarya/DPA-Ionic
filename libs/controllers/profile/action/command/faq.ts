import { createAction, on, props } from '@ngrx/store';
import { UserInfoDto } from '../../dtos/user-info.dto';
import { InteractionType } from '@shared';
import { FaqDto } from '../../dtos/faq.dto';

export const Faq = createAction(
  'Services.Profile.Commands.GetFaq',
  props<{ payload: FaqDto; async?: boolean }>()
);

export const FaqActionReducer = on(Faq, (state: any) => {
  return {
    ...state,
  };
});

export const FaqInteractionActionReducer = on(Faq, (state: any) => {
  return {
    ...state,
    faq: {
      ...state?.faq,
      type: InteractionType.PROCESS,
      isLoading: true,
    },
  };
});
