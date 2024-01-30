import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailJob = createAction(
  'Services.Menu.Job.Commands.GetDetailJob',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailJobReset = createAction(
  'Services.Menu.Job.Commands.GetDetailJobReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailJobInteractionReset = createAction(
  'Services.Menu.Job.Commands.GetDetailJobInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailJobActionReducer = on(GetDetailJob, (state: any, {}) => {
  return {
    ...state,
  };
});

export const GetDetailJobActionResetReducer = on(
  GetDetailJobReset,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);

export const GetDetailJobInteractionActionReducer = on(
  GetDetailJob,
  (state: any, {}) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        type: InteractionType.PROCESS,
        isLoading: true,
      },
    };
  }
);

export const GetDetailJobInteractionActionResetReducer = on(
  GetDetailJobInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      detail: {
        ...state?.detail,
        ...response,
      },
    };
  }
);
