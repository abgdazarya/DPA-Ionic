import { createAction, on } from '@ngrx/store';
import { MENU_JOB_INTERACTION_INITIAL_STATE } from '../../../../stores/job/states/menu-job.interaction.state';
import { MENU_JOB_INITIAL_STATE } from '../../../../stores/job/states/menu-job.state';

export const ResetAllState = createAction('Services.Job.States.ResetAllState');

export const ResetAllStateActionReducer = on(ResetAllState, (state: any) => {
  return {
    ...state,
    ...MENU_JOB_INITIAL_STATE,
  };
});

export const ResetAllStateInteractionActionReducer = on(
  ResetAllState,
  (state: any) => {
    return {
      ...state,
      ...MENU_JOB_INTERACTION_INITIAL_STATE,
    };
  }
);
