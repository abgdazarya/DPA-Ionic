import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const EditPostingan = createAction(
  'Services.Auth.Commands.EditPostingan',
  props<{ payload: any; async?: boolean }>()
);

export const EditPostinganReset = createAction(
  'Services.Auth.Commands.EditPostinganReset',
  props<{ response: any; async?: boolean }>()
);

export const EditPostinganInteractionReset = createAction(
  'Services.Auth.Commands.EditPostinganInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const EditPostinganActionReducer = on(EditPostingan, (state: any) => {
  return {
    ...state,
  };
});

export const EditPostinganActionResetReducer = on(
  EditPostinganReset,
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

export const EditPostinganInteractionActionReducer = on(
  EditPostingan,
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

export const EditPostinganInteractionActionResetReducer = on(
  EditPostinganInteractionReset,
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
