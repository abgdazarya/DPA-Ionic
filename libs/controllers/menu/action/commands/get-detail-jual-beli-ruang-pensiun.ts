import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailJualBeliRuangPensiun = createAction(
  'Services.Menu.Commands.GetDetailJualBeliRuangPensiun',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetDetailJualBeliRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetDetailJualBeliRuangPensiunReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetDetailJualBeliRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailJualBeliRuangPensiunInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetDetailJualBeliRuangPensiunActionReducer = on(
  GetDetailJualBeliRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetDetailJualBeliRuangPensiunActionResetReducer = on(
  GetDetailJualBeliRuangPensiunReset,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        detail: {
          ...state?.jualBeliRuangPensiun?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailJualBeliRuangPensiunInteractionActionReducer = on(
  GetDetailJualBeliRuangPensiun,
  (state: any) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        detail: {
          ...state?.jualBeliRuangPensiun?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailJualBeliRuangPensiunInteractionActionResetReducer = on(
  GetDetailJualBeliRuangPensiunInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        detail: {
          ...state?.jualBeliRuangPensiun?.detail,
          ...response,
        },
      },
    };
  }
);
