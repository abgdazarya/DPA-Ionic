import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { ToggleEmailDto } from '../../dtos/toggle-email.dto';

export const ToggleEmail = createAction(
  'Services.Profile.Commands.ToggleEmail',
  props<{
    payload: ToggleEmailDto;
    toggleType: 'google' | 'apple';
    async?: boolean;
  }>()
);

export const ToggleEmailActionReducer = on(ToggleEmail, (state: any) => {
  return {
    ...state,
  };
});

export const ToggleEmailInteractionActionReducer = on(
  ToggleEmail,
  (state: any, { toggleType }) => {
    return {
      ...state,
      toggleEmail: {
        ...state?.toggleEmail,
        [toggleType]: {
          ...state?.toggleEmail?.[toggleType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);
