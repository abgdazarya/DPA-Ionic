import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicListJualBeliRuangPensiun = createAction(
  'Services.Menu.Commands.GetPublicListJualBeliRuangPensiun',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListJualBeliRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetPublicListJualBeliRuangPensiunReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListJualBeliRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicListJualBeliRuangPensiunInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';

    async?: boolean;
  }>()
);

export const GetPublicListJualBeliRuangPensiunActionReducer = on(
  GetPublicListJualBeliRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListJualBeliRuangPensiunActionResetReducer = on(
  GetPublicListJualBeliRuangPensiunReset,
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

export const GetPublicListJualBeliRuangPensiunInteractionActionReducer = on(
  GetPublicListJualBeliRuangPensiun,
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

export const GetPublicListJualBeliRuangPensiunInteractionActionResetReducer =
  on(
    GetPublicListJualBeliRuangPensiunInteractionReset,
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
