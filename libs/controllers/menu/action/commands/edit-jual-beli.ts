import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const EditJualBeli = createAction(
  'Services.Auth.Commands.EditJualBeli',
  props<{ payload: any; async?: boolean }>()
);

export const EditJualBeliReset = createAction(
  'Services.Auth.Commands.EditJualBeliReset',
  props<{ response: any; async?: boolean }>()
);

export const EditJualBeliInteractionReset = createAction(
  'Services.Auth.Commands.EditJualBeliInteractionReset',
  props<{ response: any; async?: boolean }>()
);

export const EditJualBeliActionReducer = on(EditJualBeli, (state: any) => {
  return {
    ...state,
  };
});

export const EditJualBeliActionResetReducer = on(
  EditJualBeliReset,
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

export const EditJualBeliInteractionActionReducer = on(
  EditJualBeli,
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

export const EditJualBeliInteractionActionResetReducer = on(
  EditJualBeliInteractionReset,
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
