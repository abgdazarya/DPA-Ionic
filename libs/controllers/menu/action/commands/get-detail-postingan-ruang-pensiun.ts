import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetDetailPostinganRuangPensiun = createAction(
  'Services.Menu.Commands.GetDetailPostinganRuangPensiun',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetDetailPostinganRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetDetailPostinganRuangPensiunReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetDetailPostinganRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetDetailPostinganRuangPensiunInteractionReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetDetailPostinganRuangPensiunActionReducer = on(
  GetDetailPostinganRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetDetailPostinganRuangPensiunActionResetReducer = on(
  GetDetailPostinganRuangPensiunReset,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        detail: {
          ...state?.postinganRuangPensiun?.detail,
          ...response,
        },
      },
    };
  }
);

export const GetDetailPostinganRuangPensiunInteractionActionReducer = on(
  GetDetailPostinganRuangPensiun,
  (state: any) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        detail: {
          ...state?.postinganRuangPensiun?.detail,
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetDetailPostinganRuangPensiunInteractionActionResetReducer = on(
  GetDetailPostinganRuangPensiunInteractionReset,
  (state: any, { response }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        detail: {
          ...state?.postinganRuangPensiun?.detail,
          ...response,
        },
      },
    };
  }
);
