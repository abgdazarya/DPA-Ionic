import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const DeletePostingan = createAction(
  'Services.Auth.Commands.DeletePostingan',
  props<{ payload: any; async?: boolean }>()
);

export const DeletePostinganReset = createAction(
  'Services.Auth.Commands.DeletePostinganReset',
  props<{ response: any; async?: boolean }>()
);

export const DeletePostinganInteractionReset = createAction(
  'Services.Auth.Commands.DeletePostinganInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const DeletePostinganActionReducer = on(
  DeletePostingan,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const DeletePostinganActionResetReducer = on(
  DeletePostinganReset,
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

export const DeletePostinganInteractionActionReducer = on(
  DeletePostingan,
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

export const DeletePostinganInteractionActionResetReducer = on(
  DeletePostinganInteractionReset,
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
