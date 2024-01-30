import { createAction, on, props } from '@ngrx/store';
import { InteractionType } from '@shared';

export const GetPublicDetailPostinganRuangPensiun = createAction(
  'Services.Menu.Commands.GetPublicDetailPostinganRuangPensiun',
  props<{
    payload: any;
    async?: boolean;
  }>()
);

export const GetPublicDetailPostinganRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetPublicDetailPostinganRuangPensiunReset',
  props<{
    response: any;
    async?: boolean;
  }>()
);

export const GetPublicDetailPostinganRuangPensiunInteractionReset =
  createAction(
    'Services.Menu.Commands.GetPublicDetailPostinganRuangPensiunInteractionReset',
    props<{
      response: any;
      async?: boolean;
    }>()
  );

export const GetPublicDetailPostinganRuangPensiunActionReducer = on(
  GetPublicDetailPostinganRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPublicDetailPostinganRuangPensiunActionResetReducer = on(
  GetPublicDetailPostinganRuangPensiunReset,
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

export const GetPublicDetailPostinganRuangPensiunInteractionActionReducer = on(
  GetPublicDetailPostinganRuangPensiun,
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

export const GetPublicDetailPostinganRuangPensiunInteractionActionResetReducer =
  on(
    GetPublicDetailPostinganRuangPensiunInteractionReset,
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
