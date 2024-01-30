import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const InsertJualBeli = createAction(
  'Services.Auth.Commands.InsertJualBeli',
  props<{ payload: any; async?: boolean }>()
);

export const InsertJualBeliReset = createAction(
  'Services.Auth.Commands.InsertJualBeliReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertJualBeliInteractionReset = createAction(
  'Services.Auth.Commands.InsertJualBeliInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const InsertJualBeliActionReducer = on(InsertJualBeli, (state: any) => {
  return {
    ...state,
  };
});

export const InsertJualBeliActionResetReducer = on(
  InsertJualBeliReset,
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

export const InsertJualBeliInteractionActionReducer = on(
  InsertJualBeli,
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

export const InsertJualBeliInteractionActionResetReducer = on(
  InsertJualBeliInteractionReset,
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
