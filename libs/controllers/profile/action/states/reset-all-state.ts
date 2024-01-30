import { createAction, on } from '@ngrx/store';
import { PROFILE_INITIAL_INTERACTION_STATE } from '../../../../stores/profile/states/profile.interaction.state';
import { PROFILE_INITIAL_STATE } from '../../../../stores/profile/states/profile.state';

export const ResetAllState = createAction(
  'Services.Profile.States.ResetAllState'
);

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...PROFILE_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...PROFILE_INITIAL_INTERACTION_STATE,
    };
  }
);
