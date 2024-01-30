import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const DeleteJualBeli = createAction(
  'Services.Auth.Commands.DeleteJualBeli',
  props<{ payload: any; async?: boolean }>()
);

export const DeleteJualBeliReset = createAction(
  'Services.Auth.Commands.DeleteJualBeliReset',
  props<{ response: any; async?: boolean }>()
);

export const DeleteJualBeliInteractionReset = createAction(
  'Services.Auth.Commands.DeleteJualBeliInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const DeleteJualBeliActionReducer = on(DeleteJualBeli, (state: any) => {
  return {
    ...state,
  };
});

export const DeleteJualBeliActionResetReducer = on(
  DeleteJualBeliReset,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        manage: {
          ...state?.jualBeliRuangPensiun?.manage,
          ...response,
        },
      },
    };
  }
);

export const DeleteJualBeliInteractionActionReducer = on(
  DeleteJualBeli,
  (state: any) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        manage: {
          ...state?.jualBeliRuangPensiun?.manage,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const DeleteJualBeliInteractionActionResetReducer = on(
  DeleteJualBeliInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        manage: {
          ...state?.jualBeliRuangPensiun?.manage,
          ...response,
        },
      },
    };
  }
);
