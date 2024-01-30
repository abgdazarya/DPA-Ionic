import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetListPostinganRuangPensiun = createAction(
  'Services.Menu.Commands.GetListPostinganRuangPensiun',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListPostinganRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetListPostinganRuangPensiunReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListPostinganRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetListPostinganRuangPensiunInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetListPostinganRuangPensiunActionReducer = on(
  GetListPostinganRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetListPostinganRuangPensiunActionResetReducer = on(
  GetListPostinganRuangPensiunReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        [dataType]: {
          ...state?.postinganRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);

export const GetListPostinganRuangPensiunInteractionActionReducer = on(
  GetListPostinganRuangPensiun,
  (state: any, { dataType }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        [dataType]: {
          ...state?.postinganRuangPensiun?.[dataType],
          type: InteractionType.PROCESS,
          isLoading: true,
        },
      },
    };
  }
);

export const GetListPostinganRuangPensiunInteractionActionResetReducer = on(
  GetListPostinganRuangPensiunInteractionReset,
  (state: any, { response, dataType }) => {
    return {
      ...state,
      postinganRuangPensiun: {
        ...state?.postinganRuangPensiun,
        [dataType]: {
          ...state?.postinganRuangPensiun?.[dataType],
          ...response,
        },
      },
    };
  }
);
