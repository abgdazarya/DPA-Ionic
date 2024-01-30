import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicDetailJualBeliRuangPensiun = createAction(
  'Services.Menu.Commands.GetPublicDetailJualBeliRuangPensiun',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetPublicDetailJualBeliRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetPublicDetailJualBeliRuangPensiunReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetPublicDetailJualBeliRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicDetailJualBeliRuangPensiunInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetPublicDetailJualBeliRuangPensiunActionReducer = on(
  GetPublicDetailJualBeliRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPublicDetailJualBeliRuangPensiunActionResetReducer = on(
  GetPublicDetailJualBeliRuangPensiunReset,
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

export const GetPublicDetailJualBeliRuangPensiunInteractionActionReducer = on(
  GetPublicDetailJualBeliRuangPensiun,
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

export const GetPublicDetailJualBeliRuangPensiunInteractionActionResetReducer =
  on(
    GetPublicDetailJualBeliRuangPensiunInteractionReset,
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
