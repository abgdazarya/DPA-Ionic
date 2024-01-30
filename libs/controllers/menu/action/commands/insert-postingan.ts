import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const InsertPostingan = createAction(
  'Services.Auth.Commands.InsertPostingan',
  props<{ payload: any; async?: boolean }>()
);

export const InsertPostinganReset = createAction(
  'Services.Auth.Commands.InsertPostinganReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertPostinganInteractionReset = createAction(
  'Services.Auth.Commands.InsertPostinganInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertPostinganActionReducer = on(
  InsertPostingan,
  (state: any, { payload }) => {
    return {
      ...state,
    };
  }
);

export const InsertPostinganActionResetReducer = on(
  InsertPostinganReset,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        manage: {
          ...state?.postinganRuangPensiun?.manage,
          ...response,
        },
      },
    };
  }
);

export const InsertPostinganInteractionActionReducer = on(
  InsertPostingan,
  (state: any) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        manage: {
          ...state?.postinganRuangPensiun?.manage,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const InsertPostinganInteractionActionResetReducer = on(
  InsertPostinganInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        manage: {
          ...state?.postinganRuangPensiun?.manage,
          ...response,
        },
      },
    };
  }
);
