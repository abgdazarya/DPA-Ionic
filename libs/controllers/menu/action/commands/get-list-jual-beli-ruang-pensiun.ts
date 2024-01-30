import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetListJualBeliRuangPensiun = createAction(
  'Services.Menu.Commands.GetListJualBeliRuangPensiun',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListJualBeliRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetListJualBeliRuangPensiunReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListJualBeliRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetListJualBeliRuangPensiunInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListJualBeliRuangPensiunActionReducer = on(
  GetListJualBeliRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetListJualBeliRuangPensiunActionResetReducer = on(
  GetListJualBeliRuangPensiunReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        [dataType]: {
          ...state?.jualBeliRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetListJualBeliRuangPensiunInteractionActionReducer = on(
  GetListJualBeliRuangPensiun,
  (state: any, { dataType }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        [dataType]: {
          ...state?.jualBeliRuangPensiun?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetListJualBeliRuangPensiunInteractionActionResetReducer = on(
  GetListJualBeliRuangPensiunInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      jualBeliRuangPensiun: {
        ...state?.jualBeliRuangPensiun,
        [dataType]: {
          ...state?.jualBeliRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);
