import { createAction, on, props } from '@ngrx/store';
import { MenuDto } from '../../dtos/menu.dto';
import { InteractionType } from '@shared';

export const GetPublicListPostinganRuangPensiun = createAction(
  'Services.Menu.Commands.GetPublicListPostinganRuangPensiun',
  props<{
    payload: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListPostinganRuangPensiunReset = createAction(
  'Services.Menu.Commands.GetPublicListPostinganRuangPensiunReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';
    async?: boolean;
  }>()
);

export const GetPublicListPostinganRuangPensiunInteractionReset = createAction(
  'Services.Menu.Commands.GetPublicListPostinganRuangPensiunInteractionReset',
  props<{
    response: any;
    dataType: 'landing' | 'list' | 'footer' | 'latest' | 'highlight';

    async?: boolean;
  }>()
);

export const GetPublicListPostinganRuangPensiunActionReducer = on(
  GetPublicListPostinganRuangPensiun,
  (state: any) => {
    return {
      ...state,
    };
  }
);

export const GetPublicListPostinganRuangPensiunActionResetReducer = on(
  GetPublicListPostinganRuangPensiunReset,
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

export const GetPublicListPostinganRuangPensiunInteractionActionReducer = on(
  GetPublicListPostinganRuangPensiun,
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

export const GetPublicListPostinganRuangPensiunInteractionActionResetReducer =
  on(
    GetPublicListPostinganRuangPensiunInteractionReset,
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
