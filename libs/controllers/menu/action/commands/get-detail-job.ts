import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';
import { DetailJobDto } from '../../dtos/detail-job.dto';

export const GetDetailJob = createAction(
  'Services.Menu.Commands.GetDetailJob',
  props<{ payload: any; async?: boolean }>()
);

export const GetDetailJobReset = createAction(
  'Services.Menu.Commands.GetDetailJobReset',
  props<{ response: any; async?: boolean }>()
);

export const GetDetailJobInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailJobInteractionReset',
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
      job: {
        ...state?.job,
        detail: {
          ...state?.job?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailJobInteractionActionReducer = on(
  GetDetailJob,
  (state: any, {}) => {
    return {
      ...state,
      job: {
        ...state?.job,
        detail: {
          ...state?.job?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailJobInteractionActionResetReducer = on(
  GetDetailJobInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      job: {
        ...state?.job,
        detail: {
          ...state?.job?.detail,
          ...response,
        },
      },
    };
  }
);
